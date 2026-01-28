export interface Employee {
    emp_id: number
    name: string
    dept: string
    role: string
    clearance: number
}

export interface FileAccess {
    id: number
    emp_id: number
    filename: string
    filesize_mb: number
    timestamp: number
    action: string
}

export interface BadgeSwipe {
    id: number
    emp_id: number
    door_id: string
    timestamp: number
    status: string // GRANTED, DENIED
}

export interface PrinterLog {
    job_id: number
    emp_id: number
    doc_name: string
    pages: number
    timestamp: number
}

export interface Email {
    id: number
    sender_id: number
    recipient_id: number
    subject: string
    encrypted: boolean
}

export interface Case009Schema {
    employees: Employee[]
    file_access: FileAccess[]
    badge_swipes: BadgeSwipe[]
    printer_logs: PrinterLog[]
    emails: Email[]
}
