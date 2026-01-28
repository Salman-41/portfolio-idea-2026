export interface WebRequest {
    req_id: number
    ip: string
    endpoint: string
    status: number
}

export interface Case007Schema {
    web_requests: WebRequest[]
}
