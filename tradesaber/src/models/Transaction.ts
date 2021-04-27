import { TradeableCardReference, TradeableRequestedCardReference } from './Card'
import { TradeablePackReference, TradeableRequestedPackReference } from './Pack'
import User from './User'

export default interface Transaction {
    id: string
    tir: number | null
    state: Status
    timeSent: Date
    timeActed: Date
    requestedTir: number | null
    sender: User
    receiver: User
    cards: TradeableCardReference[]
    packs: TradeablePackReference[]
    requestedCards: TradeableRequestedCardReference[]
    requestedPacks: TradeableRequestedPackReference[]
}

export enum Status {
    Expired,
    Pending,
    Affirmed,
    Declined,
    Cancelled,
    Invalidated
}