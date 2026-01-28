export interface BankAccount {
    id: number
    holder: string
    balance: number
    status: string
}

export interface WireTransfer {
    id: number
    sender_id: number
    receiver_id: number
    amount: number
    timestamp: number
}

export interface Case004Schema {
    accounts: BankAccount[]
    wire_transfers: WireTransfer[]
}
