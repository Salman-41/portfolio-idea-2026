export interface BreachLog {
    id: number
    zone: string
    method: string
    severity: string
}

export interface Case006Schema {
    breach_logs: BreachLog[]
}
