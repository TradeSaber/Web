import Rarity from './Rarity'

export default interface Card {
    id: string
    name: string
    description: string
    
    rarity: Rarity
    series: string

    public: boolean
    maximum: number | null
    value: number | null
    probability: number

    baseURL: string
    coverURL: string
}

export interface CardReference {
    id: string
    guaranteed: boolean
    boost: number | null
    card: string
}

export interface TradeableCardReference {
    id: string
    card: string
}

export interface TradeableRequestedCardReference {
    id: string
    card: string
}