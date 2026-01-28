export interface Suspect {
    id: number
    name: string
    role: string
    level: number
    status: string
}

export interface AccessLog {
    log_id: number
    gate: string
    time: number
    user_id: number
    action: string
}

export interface Transaction {
    tx_id: number
    sender: number
    receiver: number
    amount: number
    type: string
}

export interface Email {
    id: number
    from_id: number
    to_id: number
    subject: string
    body: string
}

export interface Case001Schema {
    suspects: Suspect[]
    access_logs: AccessLog[]
    transactions: Transaction[]
    emails: Email[]
}
