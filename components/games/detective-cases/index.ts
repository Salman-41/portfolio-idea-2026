import { Case } from "./types"
import { Case001 } from "./cases/001-missing-key/case"
import { Case002 } from "./cases/002-sector-7/case"
import { Case003 } from "./cases/003-ghost-protocol/case"
import { Case004 } from "./cases/004-black-market/case"
import { Case005 } from "./cases/005-network-map/case"
import { Case006 } from "./cases/006-protocol-omega/case"
import { Case007 } from "./cases/007-the-botnet/case"
import { Case008 } from "./cases/008-operation-blackout/case"
import { Case009 } from "./cases/009-project-prometheus/case"

export const ALL_CASES: Case[] = [
    Case001,
    Case002,
    Case003,
    Case004,
    Case005,
    Case006,
    Case007,
    Case008,
    Case009
]
