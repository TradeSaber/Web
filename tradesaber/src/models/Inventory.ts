import { CardReference } from './Card'
import { PackReference } from './Pack'

export default interface Inventory {
    id: string
    tirCoin: number
    packs: PackReference[]
    cards: CardReference[]
    portfolioValue?: number
    rank?: number
}