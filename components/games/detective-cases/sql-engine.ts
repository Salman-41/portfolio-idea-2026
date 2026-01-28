import { DatabaseSchema, Row } from "./types"

export interface QueryResult {
    cols: string[]
    rows: Row[]
    error?: string
}

export function executeQuery(query: string, db: DatabaseSchema): QueryResult {
    try {
        let q = query.trim()
        
        // 1. EXTRACT CLAUSES
        // Limit
        let limit = -1
        const limitMatch = q.match(/limit\s+(\d+)/i)
        if (limitMatch) {
           limit = parseInt(limitMatch[1])
           q = q.replace(/limit\s+(\d+)/i, "").trim()
        }
        
        // Order By
        let orderByCol = ""
        let orderDesc = false
        const orderMatch = q.match(/order\s+by\s+([a-zA-Z0-9_.]+)(?:\s+(asc|desc))?/i)
        if (orderMatch) {
            orderByCol = orderMatch[1]
            orderDesc = orderMatch[2]?.toLowerCase() === "desc"
            q = q.replace(/order\s+by\s+([a-zA-Z0-9_.]+)(?:\s+(asc|desc))?/i, "").trim()
        }

        // Having (Must extract before Group By check)
        let havingClause = ""
        if (q.toLowerCase().includes("having")) {
            const parts = q.split(/having/i)
            havingClause = parts[1].trim()
            q = parts[0].trim()
        }

        // Group By
        let groupByCol = ""
        const groupMatch = q.match(/group\s+by\s+([a-zA-Z0-9_.]+)/i)
        if (groupMatch) {
            groupByCol = groupMatch[1]
            q = q.replace(/group\s+by\s+([a-zA-Z0-9_.]+)/i, "").trim()
        }

        // Where
        let whereClause = ""
        if (q.toLowerCase().includes("where")) {
            const parts = q.split(/where/i)
            whereClause = parts[1].trim()
            q = parts[0].trim()
        }

        // 2. PARSE SELECT & FROM & JOIN
        q = q.toLowerCase()
        if (!q.startsWith("select")) throw new Error("Only SELECT queries are allowed.")
        
        // Check DISTINCT
        let isDistinct = false
        if (q.includes("select distinct")) {
            isDistinct = true
            q = q.replace("select distinct", "select")
        }

        // Split "SELECT ... FROM ..."
        const fromSplit = q.split("from")
        if (fromSplit.length < 2) throw new Error("Missing FROM clause.")
        
        const selectPart = fromSplit[0].replace("select", "").trim()
        const afterFrom = fromSplit[1].trim()

        let dataset: Row[] = []
        let datasetAlias: string = "" // For simple queries

        // Handle JOIN
        if (afterFrom.includes(" join ")) {
            const joinParts = afterFrom.split(" join ")
            const leftTableStr = joinParts[0].trim().split(" ")[0] // Handle aliases later? simplified for now
            const rest = joinParts[1].trim()
            const onSplit = rest.split(" on ")
            const rightTableStr = onSplit[0].trim().split(" ")[0]
            const onClause = onSplit[1]?.trim()
             
            if (!db[leftTableStr]) throw new Error(`Table '${leftTableStr}' not found.`)
            if (!db[rightTableStr]) throw new Error(`Table '${rightTableStr}' not found.`)
            
            // Perform JOIN
            const leftData = db[leftTableStr] || []
            const rightData = db[rightTableStr] || []
            
            if (!onClause) throw new Error("Missing ON clause for JOIN.")
            const [leftCond, rightCond] = onClause.split("=").map(s => s.trim())
            
            // Simple logic: leftTable.col = rightTable.col
            // We assume column names are qualified like "table.col" OR unique. 
            // Better to flatten rows with prefixes: "leftTable.col", "rightTable.col"
            
            dataset = []
            leftData.forEach(lRow => {
                rightData.forEach(rRow => {
                    // Check condition
                    // Helper to get logic value: resolve "table.col"
                    const getVal = (ref: string, l: Row, r: Row) => {
                        if (ref.includes(".")) {
                            const [t, c] = ref.split(".")
                            if (t === leftTableStr) return l[c]
                            if (t === rightTableStr) return r[c]
                        }
                        return l[ref] || r[ref] // Fallback
                    }
                    
                    const lVal = getVal(leftCond, lRow, rRow)
                    const rVal = getVal(rightCond, lRow, rRow)
                    
                    if (lVal == rVal) {
                        // Merge
                        const merged: Row = {}
                        // Prefix keys to avoid collisions? 
                        // For this simplified game, we might assume unique columns OR just flatten.
                        // Let's flatten but try to preserve original if possible, or support "table.col" access
                        Object.keys(lRow).forEach(k => merged[`${leftTableStr}.${k}`] = lRow[k])
                        Object.keys(lRow).forEach(k => merged[k] = lRow[k]) // Unprefixed fallback
                        
                        Object.keys(rRow).forEach(k => merged[`${rightTableStr}.${k}`] = rRow[k])
                        Object.keys(rRow).forEach(k => merged[k] = rRow[k]) // Unprefixed fallback if no collision
                        dataset.push(merged)
                    }
                })
            })

        } else {
            // Standard Single Table
            const tablePart = afterFrom.split(" ")[0]
            if (!db[tablePart]) throw new Error(`Table '${tablePart}' not found.`)
            dataset = [...(db[tablePart] || [])]
            datasetAlias = tablePart
        }

        // 3. APPLY FILTERING (WHERE)
        if (whereClause) {
            const conditions = whereClause.split(/\s+and\s+/i).map(c => c.trim())
            dataset = dataset.filter(row => {
               return conditions.every(cond => {
                   // LIKE
                   if (cond.toLowerCase().includes(" like ")) {
                       const [col, pattern] = cond.split(/ like /i).map(s => s.trim())
                       const rowVal = String(row[col] || "").toLowerCase()
                       const cleanPattern = pattern.replace(/['"]+/g, '').toLowerCase()
                       
                       if (cleanPattern.startsWith("%") && cleanPattern.endsWith("%")) {
                           return rowVal.includes(cleanPattern.slice(1, -1))
                       } else if (cleanPattern.endsWith("%")) {
                           return rowVal.startsWith(cleanPattern.slice(0, -1))
                       } else if (cleanPattern.startsWith("%")) {
                           return rowVal.endsWith(cleanPattern.slice(1))
                       }
                       return rowVal === cleanPattern
                   }

                   // Basic Ops
                   const ops = [">=", "<=", ">", "<", "="]
                   for (const op of ops) {
                       if (cond.includes(op)) {
                           const [col, val] = cond.split(op).map(s => s.trim())
                           const cleanVal = val.replace(/['"]+/g, '')
                           const rVal = row[col]
                           
                           if (op === "=") return String(rVal).toLowerCase() == cleanVal.toLowerCase()
                           if (op === ">") return Number(rVal) > Number(cleanVal)
                           if (op === "<") return Number(rVal) < Number(cleanVal)
                           if (op === ">=") return Number(rVal) >= Number(cleanVal)
                           if (op === "<=") return Number(rVal) <= Number(cleanVal)
                       }
                   }
                   return true
               })
            })
        }

        // 4. PARSE SELECT COLUMNS
        const selectedCols = selectPart.split(",").map(c => c.trim())
        
        // 5. APPLY GROUPING & AGGREGATION
        const hasAggregates = selectedCols.some(c => 
            c.includes("count(") || c.includes("sum(") || c.includes("avg(") || c.includes("max(") || c.includes("min(")
        )

        let results: Row[] = []

        if (hasAggregates) {
            let groups: Record<string, Row[]> = {}
            if (groupByCol) {
                dataset.forEach(row => {
                    const key = String(row[groupByCol])
                    if (!groups[key]) groups[key] = []
                    groups[key].push(row)
                })
            } else {
                groups["ALL"] = dataset
            }

            results = Object.keys(groups).map(groupKey => {
                const groupRows = groups[groupKey]
                const resultRow: Row = {}
                
                selectedCols.forEach(col => {
                    if (col === groupByCol) {
                        resultRow[col] = groupRows[0][col]
                        return
                    }
                    const aggMatch = col.match(/(count|sum|avg|max|min)\((.+)\)/i)
                    if (aggMatch) {
                        const func = aggMatch[1].toLowerCase()
                        const field = aggMatch[2].trim()

                        if (func === "count") {
                            resultRow[col] = groupRows.length
                        } else {
                             const values = groupRows.map(r => Number(r[field] || 0))
                             if (func === "sum") resultRow[col] = values.reduce((a,b) => a+b, 0)
                             if (func === "avg") resultRow[col] = values.length ? parseFloat((values.reduce((a,b) => a+b, 0) / values.length).toFixed(2)) : 0
                             if (func === "max") resultRow[col] = Math.max(...values)
                             if (func === "min") resultRow[col] = Math.min(...values)
                        }
                    } else if (!groupByCol) {
                         resultRow[col] = groupRows[0]?.[col]
                    }
                })
                return resultRow
            })

            // APPLY HAVING (Filtering on Aggregates)
            if (havingClause) {
                 const conditions = havingClause.split(/\s+and\s+/i).map(c => c.trim())
                 results = results.filter(row => {
                     return conditions.every(cond => {
                        const ops = [">=", "<=", ">", "<", "="]
                        for (const op of ops) {
                            if (cond.includes(op)) {
                                const [col, val] = cond.split(op).map(s => s.trim())
                                // col is likely an aggregate function string like "count(*)"
                                // We need to match it against keys in the resultRow
                                const cleanVal = val.replace(/['"]+/g, '')
                                const rVal = row[col] || row[col.toLowerCase()] // Try to match exact key
                                
                                if (rVal === undefined) return false // Aggregate not in select list? 
                                
                                if (op === "=") return Number(rVal) == Number(cleanVal)
                                if (op === ">") return Number(rVal) > Number(cleanVal)
                                if (op === "<") return Number(rVal) < Number(cleanVal)
                                if (op === ">=") return Number(rVal) >= Number(cleanVal)
                                if (op === "<=") return Number(rVal) <= Number(cleanVal)
                            }
                        }
                        return true
                     })
                 })
            }

        } else {
             // Normal Select - Filter columns
             if (selectedCols[0] !== "*") {
                 results = dataset.map(row => {
                     const newRow: Row = {}
                     selectedCols.forEach(c => {
                         // support "table.col" or lazy match
                         if (row.hasOwnProperty(c)) newRow[c] = row[c]
                     })
                     return newRow
                 })
             } else {
                 results = dataset
             }
        }

        // 6. APPLY DISTINCT (After projection)
        if (isDistinct) {
            const unique = new Set()
            results = results.filter(row => {
                const key = JSON.stringify(row)
                if (unique.has(key)) return false
                unique.add(key)
                return true
            })
        }

        // 7. ORDER BY
        if (orderByCol) {
            results.sort((a, b) => {
                const valA = a[orderByCol]
                const valB = b[orderByCol]
                if (valA === undefined || valB === undefined) return 0
                if (valA < valB) return orderDesc ? 1 : -1
                if (valA > valB) return orderDesc ? -1 : 1
                return 0
            })
        }

        // 8. LIMIT
        if (limit > 0) {
            results = results.slice(0, limit)
        }

        if (results.length === 0) return { cols: [], rows: [] }
        return { cols: Object.keys(results[0]), rows: results }

    } catch (err: any) {
        return { cols: [], rows: [], error: err.message || "Syntax Error" }
    }
}
