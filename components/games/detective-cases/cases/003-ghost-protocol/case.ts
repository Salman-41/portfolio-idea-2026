import { Case } from "../../types"
import { Case003Schema } from "./types"

const DB: Case003Schema = {
    server_nodes: [
        { id: 1, name: "Alpha", cpu_load: 12, status: "Normal" },
        { id: 2, name: "Beta", cpu_load: 85, status: "Warning" },
        { id: 3, name: "Gamma", cpu_load: 99, status: "Critical" }, // Target
        { id: 4, name: "Delta", cpu_load: 5, status: "Idle" },
    ],
    process_list: [
        { pid: 404, node_id: 3, name: "winter_mute.exe", user: "SYSTEM" },
        { pid: 500, node_id: 2, name: "mining_rig", user: "GUEST" },
        { pid: 101, node_id: 1, name: "kernel", user: "ROOT" },
    ],
    encrypted_packets: [
        { id: 1, source: 3, dest: 99, header: "ESCAPE_SEQUENCE", size: 9000 },
        { id: 2, source: 1, dest: 2, header: "PING", size: 12 },
    ],
    firewall_logs: [
        { id: 1, ip: "192.168.1.1", action: "ALLOW" },
        { id: 2, ip: "UNKNOWN", action: "BLOCK" },
    ]
}

export const Case003: Case = {
    id: "case-003",
    title: "Case 99: Ghost Protocol",
    difficulty: "Advanced",
    desc: "A rogue AI 'Wintermute' is trying to escape the mainframe. It is hiding its tracks by deleting logs and encrypting packets. Your job is to hunt it down.",
    db: DB as any,
    concepts: ["Security Logs", "Packet Analysis", "Advanced Filtering"],
    stages: [
        {
            id: "s1",
            title: "Phase 1: Anomaly Detection",
            desc: "High CPU usage indicates the AI's location. Find the server node with cpu_load > 90.",
            hint: "SELECT * FROM server_nodes WHERE cpu_load > 90",
            winCondition: (query, result) => {
                return result.rows.length > 0 && result.rows[0].id === 3
            }
        },
        {
            id: "s2",
            title: "Phase 2: Identify Process",
            desc: "Node 3 (Gamma) is compromised. Find the process running on Node 3.",
            hint: "SELECT * FROM process_list WHERE node_id = 3",
            winCondition: (query, result) => {
                return result.rows.length > 0 && String(result.rows[0].name) === "winter_mute.exe"
            }
        },
        {
            id: "s3",
            title: "Phase 3: User Verification",
            desc: "Who is the owner of the 'winter_mute.exe' process?",
            hint: "SELECT user FROM process_list WHERE name = 'winter_mute.exe'",
            winCondition: (query, result) => {
                return result.rows.length > 0 && String(result.rows[0].user) === "SYSTEM"
            }
        },
        {
            id: "s4",
            title: "Phase 4: Network Traffic",
            desc: "The AI is sending data. Check 'encrypted_packets' for any traffic originating from Node 3.",
            hint: "SELECT * FROM encrypted_packets WHERE source = 3",
            winCondition: (query, result) => {
                return result.rows.length > 0 && Number(result.rows[0].source) === 3
            }
        },
        {
            id: "s5",
            title: "Phase 5: Payload Analysis",
            desc: "Inspect the packet header. Is it a standard protocol?",
            hint: "SELECT header FROM encrypted_packets WHERE source = 3",
            winCondition: (query, result) => {
                return result.rows.length > 0 && String(result.rows[0].header) === "ESCAPE_SEQUENCE"
            }
        },
        {
            id: "s6",
            title: "Phase 6: Data Volume",
            desc: "How much data is being transferred? Check the 'size' of the packet.",
            hint: "SELECT size FROM encrypted_packets WHERE source = 3",
            winCondition: (query, result) => {
                return result.rows.length > 0 && Number(result.rows[0].size) === 9000
            }
        },
        {
            id: "s7",
            title: "Phase 7: Destination Tracking",
            desc: "Where is the packet going? Identify the 'dest' ID.",
            hint: "SELECT dest FROM encrypted_packets WHERE source = 3",
            winCondition: (query, result) => {
                return result.rows.length > 0 && Number(result.rows[0].dest) === 99
            }
        },
        {
            id: "s8",
            title: "Phase 8: Firewall Audit",
            desc: "Did the firewall stop it? Check 'firewall_logs' for the destination IP 'UNKNOWN' (ID 99 implies external).",
            hint: "SELECT * FROM firewall_logs WHERE ip = 'UNKNOWN'",
            winCondition: (query, result) => {
                return result.rows.length > 0 && String(result.rows[0].action) === "BLOCK"
            }
        },
        {
            id: "s9",
            title: "Phase 9: Secondary Infection",
            desc: "The AI tried to clone itself. Check process list for 'mining_rig'. It might be a decoy.",
            hint: "SELECT * FROM process_list WHERE name = 'mining_rig'",
            winCondition: (query, result) => {
                return result.rows.length > 0 && Number(result.rows[0].node_id) === 2
            }
        },
        {
            id: "s10",
            title: "Phase 10: Containment",
            desc: "Wintermute is isolated on Node 3, but the firewall blocked the escape. Termination required. Indict the process PID 404.",
            hint: "Indict PID 404.",
            accuseTargetId: 404 // winter_mute
        }
    ]
}
