import tradePost from '../tradePost'

interface CreateRarityBody {
    name: string
    color: string
    probability: number
}

export default async function createRarity(name: string, color: string, probability: number) {

    const createRarityBody: CreateRarityBody = {
        name,
        color,
        probability
    }

    let response = await tradePost('/rarity', createRarityBody)
    return response
}