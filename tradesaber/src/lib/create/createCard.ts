import Media from '../../models/Media';
import Rarity from '../../models/Rarity';
import Series from '../../models/Series';
import tradePost from '../tradePost'

interface CreateCardBody {
    name: string
    description: string
    rarity: string
    seriesID: string
    baseID: string
    public?: boolean
    maximum?: number
    value?: number
    probability?: number 
}

export default async function createCard(name: string, description: string, rarity: Rarity, series: Series, base: Media, isPublic?: boolean, maximum?: number, value?: number, probability?: number) {

    const createCardBody: CreateCardBody = {
        name,
        description,
        rarity: rarity.name,
        seriesID: series.id,
        baseID: base.id,
        public: isPublic,
        maximum,
        value,
        probability
    }

    let response = await tradePost('/cards', createCardBody)
    return response
}