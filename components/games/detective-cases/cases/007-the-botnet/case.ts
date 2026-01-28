import { Case } from "../../types"
import { Case007Schema } from "./types"

const DB: Case007Schema = {
    web_requests: [
        { req_id: 1, ip: "192.168.1.5", endpoint: "/login", status: 200 },
        { req_id: 2, ip: "10.0.0.1", endpoint: "/admin", status: 403 },
        { req_id: 3, ip: "10.0.0.1", endpoint: "/admin", status: 403 },
        { req_id: 4, ip: "10.0.0.1", endpoint: "/admin", status: 403 },
        { req_id: 5, ip: "10.0.0.1", endpoint: "/login", status: 403 },
        { req_id: 6, ip: "10.0.0.1", endpoint: "/root", status: 403 },
        { req_id: 7, ip: "192.168.1.9", endpoint: "/home", status: 200 },
        { req_id: 8, ip: "10.0.0.1", endpoint: "/api", status: 500 },
        { req_id: 9, ip: "192.168.1.5", endpoint: "/login", status: 200 },
    ]
}

export const Case007: Case = {
    id: "case-007",
    title: "Case 777: The Botnet",
    difficulty: "Master",
    desc: "DDoS Attack in progress. We need to find the specific IPs that are flooding our servers. Simple counting isn't enough; we need to filter AFTER counting.",
    db: DB as any,
    stages: [
        {
            id: "s1",
            title: "Phase 1: Traffic Volume",
            desc: "Count how many requests have come from each IP address.",
            hint: "SELECT ip, COUNT(*) FROM web_requests GROUP BY ip",
            winCondition: (query, result) => {
                return result.rows.length > 0 && result.rows.some(r => r.ip === "10.0.0.1" && Number(r['count(*)']) === 6)
            }
        },
        {
            id: "s2",
            title: "Phase 2: The Filter",
            desc: "There are too many normal users. We only care about IPs that have sent MORE THAN 5 requests. Use HAVING.",
            hint: "SELECT ip, COUNT(*) FROM web_requests GROUP BY ip HAVING count(*) > 5",
            winCondition: (query, result) => {
                // Should only return 10.0.0.1
                return result.rows.length === 1 && result.rows[0].ip === "10.0.0.1"
            }
        },
        {
            id: "s3",
            title: "Phase 3: Endpoint Targeting",
            desc: "The botnet seems to target the admin panel. Find all requests to '/admin'.",
            hint: "SELECT * FROM web_requests WHERE endpoint = '/admin'",
            winCondition: (query, result) => {
                return result.rows.length === 3
            }
        },
        {
            id: "s4",
            title: "Phase 4: Admin Violators",
            desc: "Who is trying to access '/admin'? List distinctive IPs targeting that endpoint.",
            hint: "SELECT DISTINCT ip FROM web_requests WHERE endpoint = '/admin'",
            winCondition: (query, result) => {
                return result.rows.length === 1 && result.rows[0].ip === "10.0.0.1"
            }
        },
        {
            id: "s5",
            title: "Phase 5: Failed Logins",
            desc: "Check for status code 403 (Forbidden). Count how many 403 errors per IP.",
            hint: "SELECT ip, COUNT(*) FROM web_requests WHERE status = 403 GROUP BY ip",
            winCondition: (query, result) => {
                return result.rows.some(r => r.ip === "10.0.0.1" && Number(r['count(*)']) === 5)
            }
        },
        {
            id: "s6",
            title: "Phase 6: Server Errors",
            desc: "Did any requests cause a 500 Server Error?",
            hint: "SELECT * FROM web_requests WHERE status = 500",
            winCondition: (query, result) => {
                return result.rows.length > 0 && Number(result.rows[0].status) === 500
            }
        },
        {
            id: "s7",
            title: "Phase 7: Root Access",
            desc: "Someone tried to access '/root'. This is a critical alert. Identify the request ID.",
            hint: "SELECT req_id FROM web_requests WHERE endpoint = '/root'",
            winCondition: (query, result) => {
                return Number(result.rows[0].req_id) === 6
            }
        },
        {
            id: "s8",
            title: "Phase 8: Normal Traffic",
            desc: "Filter out the noise. Find requests with status 200 (OK).",
            hint: "SELECT * FROM web_requests WHERE status = 200",
            winCondition: (query, result) => {
                return result.rows.length === 3
            }
        },
        {
            id: "s9",
            title: "Phase 9: Clean IPs",
            desc: "Which IPs are legitimate (Status 200)? Return distinct IPs.",
            hint: "SELECT DISTINCT ip FROM web_requests WHERE status = 200",
            winCondition: (query, result) => {
                return result.rows.length >= 2
            }
        },
        {
            id: "s10",
            title: "Phase 10: Ban Hammer",
            desc: "IP 10.0.0.1 is the source of the botnet (High volume, 403 errors, attacking /admin). Indict this IP.",
            hint: "Indict 10.0.0.1",
            accuseTargetId: "10.0.0.1"
        }
    ]
}
