import { CardReference } from './Card'
import ColorTheme from './ColorTheme'
import Rarity from './Rarity'

export default interface Pack {
    id: string
    name: string
    description: string

    coverURL: string

    value: number | null
    cardCount: number

    theme: ColorTheme
    cardPool: CardReference[]
    rarities: Rarity[]
}

export interface PackReference {
    id: string
    pack: string
}

export interface TradeablePackReference {
    id: string
    pack: string
}

export interface TradeableRequestedPackReference {
    id: string
    pack: string
}