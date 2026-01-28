export interface ServerNode {
    id: number
    name: string
    cpu_load: number
    status: string
}

export interface Process {
    pid: number
    node_id: number
    name: string
    user: string
}

export interface Packet {
    id: number
    source: number
    dest: number
    header: string
    size: number
}

export interface FirewallLog {
    id: number
    ip: string
    action: string
}

export interface Case003Schema {
    server_nodes: ServerNode[]
    process_list: Process[]
    encrypted_packets: Packet[]
    firewall_logs: FirewallLog[]
}
