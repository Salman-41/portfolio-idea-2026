import { Case } from "./types"

export const Case001: Case = {
    id: "case-001",
    title: "Case 404: The Missing Key Saga",
    difficulty: "Novice",
    desc: "A newbie-friendly investigation that spirals into corporate conspiracy. Learn the basics of SQL interrogation while tracking down a stolen crypto-key.",
    db: {
        suspects: [
            { id: 1, name: "Neon Viper", role: "Hacker", level: 5, status: "Active" },
            { id: 2, name: "Chrome Jack", role: "Fixer", level: 3, status: "Active" },
            { id: 3, name: "Lady Lux", role: "Executive", level: 9, status: "Active" },
            { id: 4, name: "Bit Rot", role: "SysAdmin", level: 4, status: "Active" },
            { id: 99, name: "Offshore Shell Corp", role: "Unknown", level: 0, status: "Unknown" },
        ],
        access_logs: [
            { log_id: 101, gate: "SERVER_ROOM", time: 2200, user_id: 3, action: "ENTRY" },
            { log_id: 102, gate: "SERVER_ROOM", time: 2300, user_id: 4, action: "ENTRY" },
            { log_id: 103, gate: "LOBBY", time: 2305, user_id: 1, action: "EXIT" },
        ],
        transactions: [
             { tx_id: 901, sender: 3, receiver: 1, amount: 5000, type: "CONSULTING" },
             { tx_id: 902, sender: 4, receiver: 99, amount: 250000, type: "OFFSHORE" }, 
        ],
        emails: [
             { id: 501, from_id: 3, to_id: 4, subject: "Orders", body: "Transfer complete. Scrub the logs." },
             { id: 502, from_id: 1, to_id: 2, subject: "Hello", body: "Drinks later?" }
        ]
    },
    stages: [
        {
            id: "stage-1",
            title: "Phase 1: Orientation",
            desc: "Welcome to the Cyber-Crimes Division. Familiarize yourself with the employee database. Retrieve all employees with a clearance level greater than 5.",
            hint: "SELECT * FROM suspects WHERE level > 5",
            winCondition: (query, result) => {
                return result.rows.length > 0 && query.toLowerCase().includes("where level > 5")
            }
        },
        {
            id: "stage-2",
            title: "Phase 2: The Theft",
            desc: "The Corporate Crypto-Key was stolen from the SERVER_ROOM at 23:00. Identify the thief who was there at that time by checking access logs.",
            hint: "1. Check 'access_logs' for time=2300. 2. Note the user_id. 3. Find that user in suspects and Indict.",
            accuseTargetId: 4 // Bit Rot
        },
        {
            id: "stage-3",
            title: "Phase 3: The Syndicate",
            desc: "Bit Rot was just a pawn. A massive fund transfer of 250,000 credits was flagged. Who received it, and who sent the email ordering the cover-up?",
            hint: "1. Find the 250k transaction. 2. Check emails for 'orders'. 3. Indict the mastermind.",
            accuseTargetId: 3 // Lady Lux
        }
    ]
}
