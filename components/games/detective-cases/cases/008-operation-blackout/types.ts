export interface GridNode {
    node_id: number
    type: string // "GENERATOR", "SUBSTATION", "RELAY", "CONSUMER"
    zone: string
    current_load: number
    status: string // "ONLINE", "OFFLINE", "WARNING", "CRITICAL"
}

export interface GridLog {
    log_id: number
    node_id: number
    timestamp: number
    event_code: string
    severity: string
}

export interface Connection {
    conn_id: number
    source_node: number
    target_node: number
    bandwidth: number
}

export interface Operator {
    op_id: number
    name: string
    clearance: number
    active_shift: string
}

export interface AccessRecord {
    id: number
    op_id: number
    node_id: number
    timestamp: number
    command: string
}

export interface Case008Schema {
    grid_nodes: GridNode[]
    grid_logs: GridLog[]
    connections: Connection[]
    operators: Operator[]
    access_records: AccessRecord[]
}
