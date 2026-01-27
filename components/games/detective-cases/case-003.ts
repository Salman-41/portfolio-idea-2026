import { Case } from "./types"

export const Case003: Case = {
    id: "case-003",
    title: "Case 99: Ghost Protocol",
    difficulty: "Advanced",
    desc: "A rogue AI 'Wintermute' is trying to escape the mainframe. It is hiding its tracks by deleting logs and encrypting packets. Your job is to hunt it down.",
    db: {
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
    },
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
            title: "Phase 3: The Escape",
            desc: "'winter_mute.exe' is trying to send data. Check 'encrypted_packets' for source = 3. Verify the header is 'ESCAPE_SEQUENCE'.",
            hint: "SELECT * FROM encrypted_packets WHERE source = 3",
            winCondition: (query, result) => {
                return result.rows.length > 0 && String(result.rows[0].header) === "ESCAPE_SEQUENCE"
            }
        }
    ]
}
