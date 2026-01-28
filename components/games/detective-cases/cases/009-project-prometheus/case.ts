import { Case } from "../../types"
import { Case009Schema } from "./types"

const DB: Case009Schema = {
    employees: [
        { emp_id: 1, name: "Dr. A. Turing", dept: "AI_RESEARCH", role: "Director", clearance: 5 },
        { emp_id: 2, name: "Alice B.", dept: "AI_RESEARCH", role: "Sr. Engineer", clearance: 4 },
        { emp_id: 3, name: "Bob C.", dept: "IT_SUPPORT", role: "SysAdmin", clearance: 3 },
        { emp_id: 4, name: "Eve D.", dept: "HR", role: "Manager", clearance: 2 },
        { emp_id: 5, name: "Mallory X.", dept: "JANITORIAL", role: "Staff", clearance: 1 },
    ],
    file_access: [
        { id: 101, emp_id: 1, filename: "project_prometheus.weights", filesize_mb: 5000, timestamp: 800, action: "READ" },
        { id: 102, emp_id: 2, filename: "model_config.json", filesize_mb: 1, timestamp: 805, action: "WRITE" },
        { id: 103, emp_id: 3, filename: "firewall.log", filesize_mb: 50, timestamp: 810, action: "READ" },
        { id: 104, emp_id: 5, filename: "project_prometheus.weights", filesize_mb: 5000, timestamp: 2300, action: "COPY" }, // Suspicious!
        { id: 105, emp_id: 1, filename: "meeting_notes.txt", filesize_mb: 0.1, timestamp: 900, action: "READ" },
    ],
    badge_swipes: [
        { id: 901, emp_id: 1, door_id: "LAB_MAIN", timestamp: 755, status: "GRANTED" },
        { id: 902, emp_id: 2, door_id: "LAB_MAIN", timestamp: 800, status: "GRANTED" },
        { id: 903, emp_id: 5, door_id: "LAB_MAIN", timestamp: 2250, status: "DENIED" }, // Failed entry
        { id: 904, emp_id: 5, door_id: "SERVER_ROOM", timestamp: 2255, status: "GRANTED" }, // Wait, Janitor in server room?
        { id: 905, emp_id: 5, door_id: "EXIT", timestamp: 2330, status: "GRANTED" },
    ],
    printer_logs: [
        { job_id: 77, emp_id: 4, doc_name: "policy_update.pdf", pages: 5, timestamp: 1200 },
        { job_id: 78, emp_id: 5, doc_name: "circuit_diagram_top_secret.pdf", pages: 1, timestamp: 2310 }, // !!
    ],
    emails: [
        { id: 1, sender_id: 2, recipient_id: 1, subject: "Model Convergence", encrypted: true },
        { id: 2, sender_id: 4, recipient_id: 5, subject: "Shift Change", encrypted: false },
        { id: 3, sender_id: 5, recipient_id: 99, subject: "The Eagle has landed", encrypted: true }, // 99 is external
    ]
}

export const Case009: Case = {
    id: "case-009",
    title: "Case 999: Project Prometheus",
    difficulty: "Master",
    concepts: ["FORENSICS", "TIME ANALYSIS", "CROSS-REFERENCE", "DISTINCT"],
    desc: "GRANDMASTER CLASS. The prototype AI weights have been leaked. The file is 5TB. It wasn't emailed. Someone took it physically. 20 stages to catch the mole.",
    db: DB as any,
    stages: [
        // --- CHAPTER 1: THE CRIME SCENE ---
        {
            id: "s1",
            title: "1. Asset Identification",
            desc: "The leaked file is named 'project_prometheus.weights'. Find who accessed this file.",
            hint: "SELECT * FROM file_access WHERE filename = 'project_prometheus.weights'",
            winCondition: (q, r) => r.rows.length === 2 // Dr. Turing and Mallory
        },
        {
            id: "s2",
            title: "2. Timestamp Analysis",
            desc: "Dr. Turing is the Director, his access is normal. Look at the other access. What is the timestamp?",
            hint: "SELECT timestamp FROM file_access WHERE filename = 'project_prometheus.weights' AND emp_id != 1",
            winCondition: (q, r) => Number(r.rows[0].timestamp) === 2300
        },
        {
            id: "s3",
            title: "3. Identify the Suspect",
            desc: "Employee ID 5 accessed the file at 23:00. Who is Employee 5?",
            hint: "SELECT * FROM employees WHERE emp_id = 5",
            winCondition: (q, r) => r.rows[0]?.name === "Mallory X."
        },
        {
            id: "s4",
            title: "4. Role Check",
            desc: "What is Mallory's role? Does a Janitor need AI weights?",
            hint: "SELECT role, dept FROM employees WHERE emp_id = 5",
            winCondition: (q, r) => r.rows[0]?.role === "Staff" && r.rows[0]?.dept === "JANITORIAL"
        },
        // --- CHAPTER 2: MOVEMENT TRACKING ---
        {
            id: "s5",
            title: "5. Physical Presence",
            desc: "Did Mallory actually enter the building late at night? Check badge swipes for ID 5 after timestamp 2000.",
            hint: "SELECT * FROM badge_swipes WHERE emp_id = 5 AND timestamp > 2000",
            winCondition: (q, r) => r.rows.length === 3
        },
        {
            id: "s6",
            title: "6. Denied Access",
            desc: "Mallory tried to enter a secure room but failed. Which door denied access?",
            hint: "SELECT door_id FROM badge_swipes WHERE emp_id = 5 AND status = 'DENIED'",
            winCondition: (q, r) => r.rows[0]?.door_id === "LAB_MAIN"
        },
        {
            id: "s7",
            title: "7. The Workaround",
            desc: "After being denied at LAB_MAIN, where did Mallory go? Check the next granted swipe.",
            hint: "SELECT * FROM badge_swipes WHERE emp_id = 5 AND status = 'GRANTED' AND timestamp > 2250",
            winCondition: (q, r) => r.rows[0]?.door_id === "SERVER_ROOM"
        },
        {
            id: "s8",
            title: "8. Clearance Violation",
            desc: "Does a Clearance Level 1 employee have access to the SERVER_ROOM? (This implies a stolen admin badge or a hacked lock, finding this is key context). Select Mallory's clearance.",
            hint: "SELECT clearance FROM employees WHERE emp_id = 5",
            winCondition: (q, r) => Number(r.rows[0]?.clearance) === 1
        },
        // --- CHAPTER 3: DATA EXFILTRATION ---
        {
            id: "s9",
            title: "9. The Copy",
            desc: "We saw the file access earlier. What was the 'action' taken by ID 5?",
            hint: "SELECT action FROM file_access WHERE emp_id = 5 AND filename = 'project_prometheus.weights'",
            winCondition: (q, r) => r.rows[0]?.action === "COPY"
        },
        {
            id: "s10",
            title: "10. Paper Trail",
            desc: "The file is too big for a USB. Maybe they printed key schematics? Check printer logs for ID 5.",
            hint: "SELECT * FROM printer_logs WHERE emp_id = 5",
            winCondition: (q, r) => r.rows.length > 0 && String(r.rows[0].doc_name).includes("secret")
        },
        {
            id: "s11",
            title: "11. Time correlation",
            desc: "The print job happened at 23:10. The file copy at 23:00. It fits. How many pages?",
            hint: "SELECT pages FROM printer_logs WHERE emp_id = 5",
            winCondition: (q, r) => Number(r.rows[0]?.pages) === 1
        },
        // --- CHAPTER 4: THE HANDLER ---
        {
            id: "s12",
            title: "12. Communications",
            desc: "Mallory must have a handler. Check emails sent by ID 5.",
            hint: "SELECT * FROM emails WHERE sender_id = 5",
            winCondition: (q, r) => r.rows.length === 1
        },
        {
            id: "s13",
            title: "13. External Contact",
            desc: "The recipient ID is 99. Check if ID 99 exists in our employees table.",
            hint: "SELECT * FROM employees WHERE emp_id = 99",
            winCondition: (q, r) => r.rows.length === 0
        },
        {
            id: "s14",
            title: "14. Encryption",
            desc: "Was the email encrypted? If so, it confirms intent.",
            hint: "SELECT encrypted FROM emails WHERE sender_id = 5",
            winCondition: (q, r) => String(r.rows[0]?.encrypted) === "true"
        },
        // --- CHAPTER 5: SUMMARY ---
        {
            id: "s15",
            title: "15. Full Scope",
            desc: "How many total anomalies have we found for ID 5? Count rows in file_access + rows in badge_swipes + rows in printer_logs. (Just count file_access for now).",
            hint: "SELECT COUNT(*) FROM file_access WHERE emp_id = 5",
            winCondition: (q, r) => Number(r.rows[0]['count(*)']) === 1
        },
        {
            id: "s16",
            title: "16. Badge Audit",
            desc: "Count swipes for ID 5.",
            hint: "SELECT COUNT(*) FROM badge_swipes WHERE emp_id = 5",
            winCondition: (q, r) => Number(r.rows[0]['count(*)']) === 3
        },
        {
            id: "s17",
            title: "17. Print Audit",
            desc: "Count print jobs for ID 5.",
            hint: "SELECT COUNT(*) FROM printer_logs WHERE emp_id = 5",
            winCondition: (q, r) => Number(r.rows[0]['count(*)']) === 1
        },
        {
            id: "s18",
            title: "18. Total distinct actions",
            desc: "We have evidence across 3 vectors. List distinct locations (door_ids) visited by ID 5.",
            hint: "SELECT DISTINCT door_id FROM badge_swipes WHERE emp_id = 5",
            winCondition: (q, r) => r.rows.length === 3
        },
        {
            id: "s19",
            title: "19. Final Check",
            desc: "What is the subject of the email sent to the handler?",
            hint: "SELECT subject FROM emails WHERE sender_id = 5",
            winCondition: (q, r) => r.rows[0]?.subject === "The Eagle has landed"
        },
        {
            id: "s20",
            title: "20. Indictment",
            desc: "Mallory X. (Janitor) stole the weights, printed secrets, and signaled an external handler. Indict her to alert the FBI.",
            hint: "Indict Employee 5.",
            accuseTargetId: 5
        }
    ]
}
