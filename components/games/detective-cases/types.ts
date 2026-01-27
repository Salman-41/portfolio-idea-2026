export type Row = Record<string, string | number | boolean>
export type Table = Row[]

export interface DatabaseSchema {
    suspects?: Table
    access_logs?: Table
    transactions?: Table
    emails?: Table
    phone_logs?: Table
    medical_records?: Table
    server_nodes?: Table
    encrypted_packets?: Table
    [key: string]: Table | undefined
}

export interface CaseStage {
    id: string
    title: string
    desc: string
    hint: string
    // Logic for win condition
    // If accuseTargetId is present, player must click "Indict" on that suspect
    accuseTargetId?: number 
    // If winCondition is present, player must run a specific query context
    winCondition?: (query: string, result: { cols: string[], rows: Row[] }) => boolean
}

export interface Case {
    id: string
    title: string
    difficulty: "Novice" | "Intermediate" | "Advanced"
    desc: string // Overall description
    db: DatabaseSchema
    stages: CaseStage[]
}
