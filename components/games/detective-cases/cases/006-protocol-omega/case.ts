import { Case } from "../../types"
import { Case006Schema } from "./types"

const DB: Case006Schema = {
    breach_logs: [
        { id: 1, zone: "Sector A", method: "Brute Force", severity: "High" },
        { id: 2, zone: "Sector A", method: "Phishing", severity: "Low" },
        { id: 3, zone: "Sector B", method: "Brute Force", severity: "High" },
        { id: 4, zone: "Sector A", method: "DDoS", severity: "Med" },
        { id: 5, zone: "Sector C", method: "Unknown", severity: "Critical" },
        { id: 6, zone: "Sector B", method: "Brute Force", severity: "High" },
        { id: 7, zone: "Sector A", method: "Phishing", severity: "Low" }
    ]
}

export const Case006: Case = {
    id: "case-006",
    title: "Case 606: Protocol Omega",
    difficulty: "Novice",
    desc: "We are flooded with alerts. The system is reporting thousands of breaches, but we suspect they are coming from only a few unique zones. Use DISTINCT to cut through the noise.",
    db: DB as any,
    stages: [
        {
            id: "s1",
            title: "Phase 1: Unique Zones",
            desc: "List the names of all unique zones that have been breached. Do not show duplicates.",
            hint: "SELECT DISTINCT zone FROM breach_logs",
            winCondition: (query, result) => {
                return result.rows.length === 3 // A, B, C
            }
        },
        {
            id: "s2",
            title: "Phase 2: Attack Methods",
            desc: "Identify the unique attack methods used in Sector A.",
            hint: "SELECT DISTINCT method FROM breach_logs WHERE zone = 'Sector A'",
            winCondition: (query, result) => {
                const methods = result.rows.map(r => r.method)
                return methods.includes("Brute Force") && methods.includes("Phishing") && methods.includes("DDoS") && result.rows.length >= 3
            }
        },
        {
            id: "s3",
            title: "Phase 3: Critical Breaches",
            desc: "Which zone suffered a 'Critical' severity attack?",
            hint: "SELECT zone FROM breach_logs WHERE severity = 'Critical'",
            winCondition: (query, result) => {
                return result.rows.length > 0 && String(result.rows[0].zone) === "Sector C"
            }
        },
        {
            id: "s4",
            title: "Phase 4: Frequency Analysis",
            desc: "How many attacks used 'Brute Force'? Count them.",
            hint: "SELECT COUNT(*) FROM breach_logs WHERE method = 'Brute Force'",
            winCondition: (query, result) => {
                const val = Object.values(result.rows[0] || {})[0]
                return Number(val) === 3
            }
        },
        {
            id: "s5",
            title: "Phase 5: Sector B Audit",
            desc: "Retrieve all logs for 'Sector B'.",
            hint: "SELECT * FROM breach_logs WHERE zone = 'Sector B'",
            winCondition: (query, result) => {
                return result.rows.length === 2
            }
        },
        {
            id: "s6",
            title: "Phase 6: Pattern Matching",
            desc: "Find all logs where the method contains 'Force'. Use LIKE if available, or just check equality for 'Brute Force'.",
            hint: "SELECT * FROM breach_logs WHERE method = 'Brute Force'",
            winCondition: (query, result) => {
                return result.rows.length === 3
            }
        },
        {
            id: "s7",
            title: "Phase 7: Low Severity Check",
            desc: "We can ignore noise. List distinct zones that ONLY had 'Low' severity attacks? (Hard to do with limited SQL, so just list zones with Low severity).",
            hint: "SELECT DISTINCT zone FROM breach_logs WHERE severity = 'Low'",
            winCondition: (query, result) => {
                return result.rows.length === 1 && String(result.rows[0].zone) === "Sector A"
            }
        },
        {
            id: "s8",
            title: "Phase 8: Mystery Method",
            desc: "One attack method is listed as 'Unknown'. Find the ID of that log.",
            hint: "SELECT id FROM breach_logs WHERE method = 'Unknown'",
            winCondition: (query, result) => {
                return Number(result.rows[0].id) === 5
            }
        },
        {
            id: "s9",
            title: "Phase 9: High Priority",
            desc: "List IDs of all attacks with High or Critical severity.",
            hint: "SELECT id FROM breach_logs WHERE severity = 'High' OR severity = 'Critical'",
            winCondition: (query, result) => {
                return result.rows.length === 4
            }
        },
        {
            id: "s10",
            title: "Phase 10: Root Cause",
            desc: "The critical failure in Sector C was caused by 'Unknown' method. Confirmation required. Select all columns for ID 5.",
            hint: "SELECT * FROM breach_logs WHERE id = 5",
            winCondition: (query, result) => {
                return Number(result.rows[0].id) === 5
            }
        }
    ]
}
