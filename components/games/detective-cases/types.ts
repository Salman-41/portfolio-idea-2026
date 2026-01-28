export type Row = Record<string, string | number | boolean>
export type Table = Row[]

// Generic Database Schema - Key is table name, Value is array of rows
export interface DatabaseSchema {
    [tableName: string]: Table | undefined
}

export interface CaseStage {
    id: string
    title: string
    desc: string
    hint: string
    // Logic for win condition
    // If accuseTargetId is present, player must click "Indict" on that suspect
    accuseTargetId?: number | string
    // If winCondition is present, player must run a specific query context
    winCondition?: (query: string, result: { cols: string[], rows: Row[] }) => boolean
}

export interface Case {
    id: string
    title: string
    difficulty: "Novice" | "Intermediate" | "Advanced" | "Master"
    desc: string // Overall description
    db: DatabaseSchema
    stages: CaseStage[]
    concepts?: string[] // e.g. ["SELECT", "WHERE", "JOIN"]
}
