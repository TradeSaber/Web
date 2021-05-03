import Card from '../../models/Card'
import ColorTheme from '../../models/ColorTheme'
import Media from '../../models/Media'
import Rarity from '../../models/Rarity'
import tradePost from '../tradePost'

export interface CreatePackReference {
    card: Card
    boost?: number
    guaranteed?: boolean
}

interface CreatePackBody {
    name: string
    description: string
    coverID: string
    value?: number
    cardCount?: number
    theme: ColorTheme
    rarities?: string[]
    cardPool?: CreatePackReference[]
}

export default async function createPack(name: string, description: string, cover: Media, theme: ColorTheme, value?: number, count?: number, rarities?: Rarity[], pool?: CreatePackReference[]) {

    const createPackBody: CreatePackBody = {
        name,
        description,
        coverID: cover.id,
        value,
        theme,
        cardCount: count,
        rarities: rarities?.map(r => r.name),
        cardPool: pool
    }

    let response = await tradePost('/packs', createPackBody)
    return response
}