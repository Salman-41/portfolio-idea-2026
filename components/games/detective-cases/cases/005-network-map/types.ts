export interface Agent {
    id: number
    codename: string
    faction: string
    clearance: number
}

export interface Relationship {
    r_id: number
    agent_a: number
    agent_b: number
    type: string
    strength: number
}

export interface Case005Schema {
    agents: Agent[]
    relationships: Relationship[]
}
