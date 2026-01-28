import { Case } from "../../types"
import { Case004Schema } from "./types"

const DB: Case004Schema = {
    accounts: [
        { id: 10, holder: "Shell Corp A", balance: 5000, status: "Active" },
        { id: 11, holder: "Shell Corp B", balance: 1000, status: "Active" },
        { id: 12, holder: "The Laundromat", balance: 999999, status: "Flagged" },
        { id: 13, holder: "Unknown Dealer", balance: 500, status: "Active" },
    ],
    wire_transfers: [
        { id: 101, sender_id: 10, receiver_id: 12, amount: 50000, timestamp: 100 },
        { id: 102, sender_id: 11, receiver_id: 12, amount: 20000, timestamp: 105 },
        { id: 103, sender_id: 13, receiver_id: 12, amount: 500, timestamp: 110 },
        { id: 104, sender_id: 10, receiver_id: 11, amount: 500, timestamp: 115 },
        { id: 105, sender_id: 10, receiver_id: 12, amount: 50000, timestamp: 120 },
        { id: 106, sender_id: 12, receiver_id: 10, amount: 100, timestamp: 125 },
    ]
}

export const Case004: Case = {
    id: "case-004",
    title: "Case 101: The Black Market",
    difficulty: "Advanced",
    desc: "Financial Forensics Division. We have intercepted a ledger of wire transfers. Use Aggregation Functions (COUNT, SUM, GROUP BY) to identify the money laundering hub.",
    db: DB as any,
    concepts: ["COUNT", "SUM", "GROUP BY"],
    stages: [
        {
            id: "s1",
            title: "Phase 1: Volume Analysis",
            desc: "We suspect 'Shell Corp A' (ID 10) is funneling money. Count how many transfers they initiated.",
            hint: "SELECT COUNT(*) FROM wire_transfers WHERE sender_id = 10",
            winCondition: (query, result) => {
                const val = Object.values(result.rows[0] || {})[0]
                return Number(val) === 3
            }
        },
        {
            id: "s2",
            title: "Phase 2: Total Exposure",
            desc: "How much money in total has 'Shell Corp A' (ID 10) sent to 'The Laundromat' (ID 12)? Use SUM.",
            hint: "SELECT SUM(amount) FROM wire_transfers WHERE sender_id = 10 AND receiver_id = 12",
            winCondition: (query, result) => {
                const val = Object.values(result.rows[0] || {})[0]
                return Number(val) === 100000
            }
        },
        {
            id: "s3",
            title: "Phase 3: Small Transfers",
            desc: "Are they structuring payments? Find all transfers less than 1000 credits sent by anyone.",
            hint: "SELECT * FROM wire_transfers WHERE amount < 1000",
            winCondition: (query, result) => {
                return result.rows.length >= 3
            }
        },
        {
            id: "s4",
            title: "Phase 4: Shell Corp B",
            desc: "Investigate 'Shell Corp B' (ID 11). What is their current balance?",
            hint: "SELECT balance FROM accounts WHERE id = 11",
            winCondition: (query, result) => {
                return result.rows.length > 0 && Number(result.rows[0].balance) === 1000
            }
        },
        {
            id: "s5",
            title: "Phase 5: Inbound Funds",
            desc: "Who sent money TO 'Shell Corp B'? Check wire_transfers where receiver_id is 11.",
            hint: "SELECT sender_id FROM wire_transfers WHERE receiver_id = 11",
            winCondition: (query, result) => {
                return result.rows.length > 0 && Number(result.rows[0].sender_id) === 10
            }
        },
        {
            id: "s6",
            title: "Phase 6: The Connector",
            desc: "So Shell Corp A funds Shell Corp B. Does Corp B send money to the Laundromat? Check transfers from 11 to 12.",
            hint: "SELECT * FROM wire_transfers WHERE sender_id = 11 AND receiver_id = 12",
            winCondition: (query, result) => {
                return result.rows.length > 0
            }
        },
        {
            id: "s7",
            title: "Phase 7: Average Transaction",
            desc: "What is the average transaction amount sent to The Laundromat (ID 12)?",
            hint: "SELECT AVG(amount) FROM wire_transfers WHERE receiver_id = 12",
            winCondition: (query, result) => {
                const val = Object.values(result.rows[0] || {})[0]
                return Number(val) > 10000 // Just check it's high
            }
        },
        {
            id: "s8",
            title: "Phase 8: Kickbacks",
            desc: "Did The Laundromat (12) send any money BACK to Shell Corp A (10)? This proves collusion.",
            hint: "SELECT * FROM wire_transfers WHERE sender_id = 12 AND receiver_id = 10",
            winCondition: (query, result) => {
                return result.rows.length > 0
            }
        },
        {
            id: "s9",
            title: "Phase 9: Account Flagging",
            desc: "The Laundromat is already 'Flagged' in our system. Verify its status in the accounts table.",
            hint: "SELECT status FROM accounts WHERE id = 12",
            winCondition: (query, result) => {
                return String(result.rows[0].status) === "Flagged"
            }
        },
        {
            id: "s10",
            title: "Phase 10: The Kingpin",
            desc: "We have the flow: 10 -> 11 -> 12, and 10 -> 12 direct. The Laundromat is the hub. Indict Account ID 12.",
            hint: "Indict Account ID 12.",
            accuseTargetId: 12
        }
    ]
}
