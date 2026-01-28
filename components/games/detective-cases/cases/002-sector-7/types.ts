export interface Citizen {
    id: number
    name: string
    sector: number
    status: string
}

export interface MedicalRecord {
    record_id: number
    patient_id: number
    timestamp: number
    symptoms: string
}

export interface ContactLog {
    id: number
    p1: number
    p2: number
    duration: number
    location: string
}

export interface LabTransaction {
    tx_id: number
    lab_id: number
    buyer_id: number
    item: string
    cost: number
}

export interface Case002Schema {
    citizens: Citizen[]
    medical_records: MedicalRecord[]
    contact_logs: ContactLog[]
    lab_transactions: LabTransaction[]
}
