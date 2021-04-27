import { CardReference } from './Card'
import { SeriesReference } from './Series'

export default interface Mutation {
    id: string
    active: boolean
    name: string
    globalXPBoost: number | null
    globalTirBoost: number | null
    cards: CardReference[]
    series: SeriesReference[]
}