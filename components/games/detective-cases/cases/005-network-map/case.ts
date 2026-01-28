import { Case } from "../../types"
import { Case005Schema } from "./types"

const DB: Case005Schema = {
    agents: [
         { id: 1, codename: "Cipher", faction: "DedSec", clearance: 5 },
         { id: 2, codename: "Zero", faction: "DedSec", clearance: 3 },
         { id: 3, codename: "Moriarty", faction: "Syndicate", clearance: 10 },
         { id: 4, codename: "Smith", faction: "FBI", clearance: 8 },
         { id: 5, codename: "Neo", faction: "Resistance", clearance: 9 },
    ],
    relationships: [
         { r_id: 101, agent_a: 1, agent_b: 2, type: "Mentorship", strength: 80 },
         { r_id: 102, agent_a: 1, agent_b: 3, type: "Rivalry", strength: 90 },
         { r_id: 103, agent_a: 3, agent_b: 4, type: "Mole", strength: 100 },
         { r_id: 104, agent_a: 3, agent_b: 5, type: "Target", strength: 50 },
         { r_id: 105, agent_a: 4, agent_b: 1, type: "Surveillance", strength: 20 },
    ]
}

export const Case005: Case = {
    id: "case-005",
    title: "Case 505: The Network Map",
    difficulty: "Advanced",
    desc: "Intelligence has intercepted a social graph. We have a list of 'Agent's and a list of 'Relationships'. Use JOINs to decode the map and find the high-value target.",
    db: DB as any,
    concepts: ["INNER JOIN", "Relational Mapping", "Complex Queries"],
    stages: [
        {
            id: "s1",
            title: "Phase 1: Link Analysis",
            desc: "The 'relationships' table only shows IDs. Perform an INNER JOIN with 'agents' to see the codenames of 'agent_a'.",
            hint: "SELECT agents.codename, relationships.type FROM agents JOIN relationships ON agents.id = relationships.agent_a",
            winCondition: (query, result) => {
                const row = result.rows[0]
                return !!row && (!!row['codename'] || !!row['agents.codename'])
            }
        },
        {
            id: "s2",
            title: "Phase 2: The Mole",
            desc: "Who is maintaining a relationship with 'Smith' (ID 4) that is greater than strength 50? Join and Filter.",
            hint: "SELECT * FROM agents JOIN relationships ON agents.id = relationships.agent_a WHERE relationships.agent_b = 4 AND relationships.strength > 50",
            winCondition: (query, result) => {
                 return result.rows.some(r => r.codename === "Moriarty" || r['agents.codename'] === "Moriarty")
            }
        },
        {
            id: "s3",
            title: "Phase 3: The Spider",
            desc: "Who has the most connections? Group By 'agent_a' and Count. The Visualizer will show you the key influencer.",
            hint: "SELECT agents.codename, COUNT(relationships.r_id) FROM agents JOIN relationships ON agents.id = relationships.agent_a GROUP BY agents.codename",
            winCondition: (query, result) => {
                // Determine max connection agent
                return result.rows.length > 0
            }
        },
        {
            id: "s4",
            title: "Phase 4: Deadsec Operatives",
            desc: "Find all agents who belong to the 'DeDSec' faction and have a clearance level > 4.",
            hint: "SELECT * FROM agents WHERE faction = 'DedSec' AND clearance > 4",
            winCondition: (query, result) => {
                return result.rows.length > 0 && String(result.rows[0].codename) === "Cipher"
            }
        },
        {
            id: "s5",
            title: "Phase 5: Rivalry",
            desc: "Who is Cipher's Rival? Join agents and relationships where Agent A is Cipher (ID 1) and Type is 'Rivalry'.",
            hint: "SELECT * FROM relationships WHERE agent_a = 1 AND type = 'Rivalry'",
            winCondition: (query, result) => {
                return result.rows.length > 0 && Number(result.rows[0].agent_b) === 3
            }
        },
        {
            id: "s6",
            title: "Phase 6: Identify Rival",
            desc: "We found the Rival ID is 3. Who is Agent 3?",
            hint: "SELECT codename FROM agents WHERE id = 3",
            winCondition: (query, result) => {
                return result.rows.length > 0 && String(result.rows[0].codename) === "Moriarty"
            }
        },
        {
            id: "s7",
            title: "Phase 7: Surveillance",
            desc: "The FBI (Agent 4) is watching someone. Who is the target of the relationship type 'Surveillance'?",
            hint: "SELECT agent_b FROM relationships WHERE agent_a = 4 AND type = 'Surveillance'",
            winCondition: (query, result) => {
                return result.rows.length > 0 && Number(result.rows[0].agent_b) === 1
            }
        },
        {
            id: "s8",
            title: "Phase 8: High Value Targets",
            desc: "List all agents with Clearance Level 9 or higher.",
            hint: "SELECT * FROM agents WHERE clearance >= 9",
            winCondition: (query, result) => {
                return result.rows.length >= 2 // Moriarty and Neo
            }
        },
        {
            id: "s9",
            title: "Phase 9: The Weak Link",
            desc: "Find the relationship with the lowest strength score.",
            hint: "SELECT * FROM relationships ORDER BY strength ASC LIMIT 1",
            winCondition: (query, result) => {
                return result.rows.length > 0 && Number(result.rows[0].strength) === 20
            }
        },
        {
            id: "s10",
            title: "Phase 10: Network Takedown",
            desc: "Moriarty (ID 3) is the center of the 'Syndicate'. Identify all agents directly connected to him (Targeting him or targeted by him).",
            hint: "SELECT * FROM relationships WHERE agent_a = 3 OR agent_b = 3",
            winCondition: (query, result) => {
                return result.rows.length >= 2
            }
        }
    ]
}
