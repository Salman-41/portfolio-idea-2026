import { Case } from "./types"

export const Case002: Case = {
    id: "case-002",
    title: "Case 77: Sector 7 Outbreak",
    difficulty: "Intermediate",
    desc: "A bio-digital virus has been detected in Sector 7. Your mission is to identify Patient Zero, trace their contacts, and find the source of the infection before it spreads to the Core.",
    db: {
        citizens: [
            { id: 101, name: "Sarah Connor", sector: 7, status: "Infected" },
            { id: 102, name: "Kyle Reese", sector: 7, status: "Healthy" },
            { id: 103, name: "Dr. Miles Dyson", sector: 5, status: "Healthy" },
            { id: 104, name: "T-800", sector: 7, status: "Carrier" },
            { id: 105, name: "John Doe", sector: 7, status: "Infected" },
        ],
        medical_records: [
            { record_id: 1, patient_id: 101, timestamp: 800, symptoms: "Fever" },
            { record_id: 2, patient_id: 105, timestamp: 900, symptoms: "Cough" },
            { record_id: 3, patient_id: 104, timestamp: 600, symptoms: "None" }, // First case
        ],
        contact_logs: [
            { id: 1, p1: 104, p2: 101, duration: 30, location: "Cafe" },
            { id: 2, p1: 101, p2: 105, duration: 60, location: "Office" },
            { id: 3, p1: 102, p2: 103, duration: 120, location: "Lab" },
        ],
        lab_transactions: [
             { tx_id: 55, lab_id: 99, buyer_id: 104, item: "Vial-X", cost: 5000 },
             { tx_id: 56, lab_id: 99, buyer_id: 103, item: "Gloves", cost: 10 },
        ]
    },
    stages: [
        {
            id: "s1",
            title: "Phase 1: Patient Zero",
            desc: "The outbreak started early in the morning. Find the patient with the earliest timestamp in 'medical_records'.",
            hint: "SELECT * FROM medical_records ORDER BY timestamp ASC LIMIT 1",
            winCondition: (query, result) => {
                return result.rows.length > 0 && String(result.rows[0].patient_id) === "104"
            }
        },
        {
            id: "s2",
            title: "Phase 2: Contact Tracing",
            desc: "Patient Zero is ID 104. Who did they contact first? Check the 'contact_logs' for interactions involving ID 104.",
            hint: "SELECT * FROM contact_logs WHERE p1 = 104 OR p2 = 104",
            winCondition: (query, result) => {
                return result.rows.some(r => r.p1 === 104 || r.p2 === 104)
            }
        },
        {
            id: "s3",
            title: "Phase 3: The Source",
            desc: "ID 104 (T-800) is the carrier. Did they purchase anything suspicious from the Lab? Check 'lab_transactions' and Indict the Citizen.",
            hint: "Check 'lab_transactions' for buyer_id 104. What did they buy?",
            accuseTargetId: 104 // T-800
        }
    ]
}
