import { Case } from "../../types"
import { Case008Schema } from "./types"

const DB: Case008Schema = {
    grid_nodes: [
        { node_id: 1, type: "GENERATOR", zone: "NORTH", current_load: 85, status: "ONLINE" },
        { node_id: 2, type: "GENERATOR", zone: "SOUTH", current_load: 92, status: "WARNING" },
        { node_id: 3, type: "SUBSTATION", zone: "NORTH", current_load: 45, status: "ONLINE" },
        { node_id: 4, type: "SUBSTATION", zone: "EAST", current_load: 0, status: "OFFLINE" },
        { node_id: 5, type: "RELAY", zone: "NORTH", current_load: 120, status: "CRITICAL" },
        { node_id: 6, type: "RELAY", zone: "WEST", current_load: 60, status: "ONLINE" },
        { node_id: 7, type: "CONSUMER", zone: "CITY", current_load: 80, status: "ONLINE" },
        { node_id: 8, type: "CONTROL", zone: "HQ", current_load: 20, status: "ONLINE" }
    ],
    grid_logs: [
        { log_id: 101, node_id: 2, timestamp: 1000, event_code: "OVERLOAD", severity: "HIGH" },
        { log_id: 102, node_id: 5, timestamp: 1005, event_code: "SURGE", severity: "CRITICAL" },
        { log_id: 103, node_id: 4, timestamp: 1010, event_code: "SHUTDOWN", severity: "HIGH" },
        { log_id: 104, node_id: 1, timestamp: 1015, event_code: "PING", severity: "LOW" },
        { log_id: 105, node_id: 5, timestamp: 1020, event_code: "UNAUTH_ACCESS", severity: "CRITICAL" },
        { log_id: 106, node_id: 2, timestamp: 1025, event_code: "OVERLOAD", severity: "HIGH" },
        { log_id: 107, node_id: 8, timestamp: 0, event_code: "BOOT", severity: "INFO" },
    ],
    connections: [
        { conn_id: 1, source_node: 1, target_node: 3, bandwidth: 1000 },
        { conn_id: 2, source_node: 2, target_node: 4, bandwidth: 1000 }, // Dead link
        { conn_id: 3, source_node: 3, target_node: 5, bandwidth: 500 },
        { conn_id: 4, source_node: 5, target_node: 7, bandwidth: 500 }, // Critical path
    ],
    operators: [
        { op_id: 1, name: "Chief O'Brien", clearance: 5, active_shift: "DAY" },
        { op_id: 2, name: "Rookie Dave", clearance: 1, active_shift: "NIGHT" },
        { op_id: 3, name: "SysAdmin Sarah", clearance: 4, active_shift: "DAY" },
        { op_id: 4, name: "The Phantom", clearance: 0, active_shift: "UNKNOWN" }
    ],
    access_records: [
        { id: 901, op_id: 1, node_id: 1, timestamp: 900, command: "STATUS_CHECK" },
        { id: 902, op_id: 3, node_id: 5, timestamp: 1000, command: "REROUTE" },
        { id: 903, op_id: 4, node_id: 5, timestamp: 1019, command: "INJECT_CODE" }, // Malicious
        { id: 904, op_id: 2, node_id: 4, timestamp: 1009, command: "MANUAL_SCRAM" },
    ]
}

export const Case008: Case = {
    id: "case-008",
    title: "Case 800: Operation Blackout",
    difficulty: "Master",
    concepts: ["COMPLEX JOINS", "MULTI-STEP LOGIC", "CRITICAL THINKING", "HAVING"],
    desc: "GRANDMASTER CLASS. A coordinated cyber-attack is targeting the national power grid. You have 20 steps to diagnose, isolate, and neutralize the threat before total blackout.",
    db: DB as any,
    stages: [
        // --- CHAPTER 1: SITUATION AWARENESS ---
        {
            id: "s1",
            title: "1. Status Report",
            desc: "The board lights are red. We need a sit-rep. List all nodes that are currently 'OFFLINE' or 'CRITICAL'.",
            hint: "SELECT * FROM grid_nodes WHERE status = 'OFFLINE' OR status = 'CRITICAL'",
            winCondition: (q, r) => r.rows.length >= 2 && r.rows.some(x => x.status === "CRITICAL")
        },
        {
            id: "s2",
            title: "2. Load Balance",
            desc: "Some generators are running hot. Find the Generator with the highest current_load.",
            hint: "SELECT * FROM grid_nodes WHERE type = 'GENERATOR' ORDER BY current_load DESC LIMIT 1",
            winCondition: (q, r) => r.rows.length === 1 && r.rows[0].node_id === 2
        },
        {
            id: "s3",
            title: "3. Zone Analysis",
            desc: "The NORTH zone seems unstable. Calculate the total load of all nodes in the 'NORTH' zone.",
            hint: "SELECT SUM(current_load) FROM grid_nodes WHERE zone = 'NORTH'",
            winCondition: (q, r) => Number(r.rows[0]['sum(current_load)']) === 250 // 85+45+120
        },
        {
            id: "s4",
            title: "4. The First Warning",
            desc: "Check the logs. Identify the very first 'WARNING' or higher severity event code that occurred after timestamp 1000.",
            hint: "SELECT * FROM grid_logs WHERE severity != 'LOW' AND timestamp > 1000 ORDER BY timestamp ASC LIMIT 1",
            winCondition: (q, r) => r.rows.length > 0 && r.rows[0].event_code === "SURGE"
        },
        // --- CHAPTER 2: THE ANOMALY ---
        {
            id: "s5",
            title: "5. Critical Relay",
            desc: "Node 5 (RELAY) triggered a SURGE. Who accessed Node 5 around that time (timestamp 1000-1020)?",
            hint: "SELECT * FROM access_records WHERE node_id = 5 AND timestamp BETWEEN 1000 AND 1020",
            winCondition: (q, r) => r.rows.length >= 2
        },
        {
            id: "s6",
            title: "6. Identify the Ghost",
            desc: "We see an Operator ID '4' in the access records for Node 5. Who is Operator 4?",
            hint: "SELECT * FROM operators WHERE op_id = 4",
            winCondition: (q, r) => r.rows[0]?.name === "The Phantom"
        },
        {
            id: "s7",
            title: "7. Pattern Recognition",
            desc: "The Phantom injects code. Find all logs where the severity is 'CRITICAL'. This is their signature.",
            hint: "SELECT * FROM grid_logs WHERE severity = 'CRITICAL'",
            winCondition: (q, r) => r.rows.length >= 2
        },
        {
            id: "s8",
            title: "8. Correlate Logs",
            desc: "Which nodes have experienced 'CRITICAL' errors? List the distinct node_ids.",
            hint: "SELECT DISTINCT node_id FROM grid_logs WHERE severity = 'CRITICAL'",
            winCondition: (q, r) => r.rows.length > 0 && Number(r.rows[0].node_id) === 5
        },
        // --- CHAPTER 3: TRACING THE PATH ---
        {
            id: "s9",
            title: "9. Connection Map",
            desc: "Node 5 is compromised. We need to know what it connects to. Find all targets of Node 5.",
            hint: "SELECT * FROM connections WHERE source_node = 5",
            winCondition: (q, r) => r.rows.some(x => x.target_node === 7)
        },
        {
            id: "s10",
            title: "10. Downstream Impact",
            desc: "Node 7 is a CONSUMER (City). If Node 5 fails, the City goes dark. Check the status of Node 7 right now.",
            hint: "SELECT status FROM grid_nodes WHERE node_id = 7",
            winCondition: (q, r) => r.rows[0]?.status === "ONLINE"
        },
        {
            id: "s11",
            title: "11. Upstream Source",
            desc: "What feeds Node 5? Find the 'source_node' that connects TO target_node 5.",
            hint: "SELECT * FROM connections WHERE target_node = 5",
            winCondition: (q, r) => r.rows[0]?.source_node === 3
        },
        {
            id: "s12",
            title: "12. Chain of Custody",
            desc: "Node 1 -> Node 3 -> Node 5. Check the logs for Node 1. Did it show any signs of tampering?",
            hint: "SELECT * FROM grid_logs WHERE node_id = 1",
            winCondition: (q, r) => r.rows[0]?.event_code === "PING" // Only ping, so safe
        },
        // --- CHAPTER 4: ISOLATION ---
        {
            id: "s13",
            title: "13. Operator Audit",
            desc: "We need to clear our staff. Count how many access records exists for each operator.",
            hint: "SELECT op_id, COUNT(*) FROM access_records GROUP BY op_id",
            winCondition: (q, r) => r.rows.length > 0
        },
        {
            id: "s14",
            title: "14. Filter Suspects",
            desc: "Only one operator has executed a 'INJECT_CODE' command. Who is it?",
            hint: "SELECT op_id FROM access_records WHERE command = 'INJECT_CODE'",
            winCondition: (q, r) => Number(r.rows[0]?.op_id) === 4
        },
        {
            id: "s15",
            title: "15. Find the Breach",
            desc: "Node 5 reported 'UNAUTH_ACCESS'. Verify the timestamp of that log against The Phantom's access record.",
            hint: "SELECT * FROM grid_logs WHERE event_code = 'UNAUTH_ACCESS'",
            winCondition: (q, r) => r.rows.length === 1 && r.rows[0].timestamp === 1020 // Close to 1019
        },
        {
            id: "s16",
            title: "16. Damage Assessment",
            desc: "How many High/Critical alerts in total?",
            hint: "SELECT COUNT(*) FROM grid_logs WHERE severity = 'HIGH' OR severity = 'CRITICAL'",
            winCondition: (q, r) => Number(r.rows[0]['count(*)']) === 5
        },
        // --- CHAPTER 5: COUNTER-STRIKE ---
        {
            id: "s17",
            title: "17. Kill Switch",
            desc: "We need to shut down the compromised node. Find Node 5's details one last time to confirm targets.",
            hint: "SELECT * FROM grid_nodes WHERE node_id = 5",
            winCondition: (q, r) => r.rows[0]?.node_id === 5
        },
        {
            id: "s18",
            title: "18. Reroute Power",
            desc: "Is there any other path to the City (Node 7)? Check connections where target is 7 AND source is NOT 5.",
            hint: "SELECT * FROM connections WHERE target_node = 7 AND source_node != 5",
            winCondition: (q, r) => r.rows.length === 0 // No backup! 
        },
        {
            id: "s19",
            title: "19. The Hard Choice",
            desc: "There is no backup line. We must save the grid by cutting the city. Verify Node 4 (Substation East). Is it available?",
            hint: "SELECT status FROM grid_nodes WHERE node_id = 4",
            winCondition: (q, r) => r.rows[0]?.status === "OFFLINE"
        },
        {
            id: "s20",
            title: "20. Final Verdict",
            desc: "The Phantom (Operator 4) caused the critical failure of Node 5. Indict The Phantom to authorize the manual override and purge the system.",
            hint: "Indict Operator 4 (The Phantom).",
            accuseTargetId: 4
        }
    ]
}
