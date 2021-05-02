import tradePost from '../tradePost'
import Media from '../../models/Media'
import ColorTheme from '../../models/ColorTheme'

interface CreateSeriesBody {
    name: string
    description: string
    iconID: string
    bannerID: string
    theme: ColorTheme
}

export default async function createSeries(name: string, description: string, icon: Media, banner: Media, theme: ColorTheme) {
    
    const createSeriesBody: CreateSeriesBody = {
        name,
        description,
        iconID: icon.id,
        bannerID: banner.id,
        theme
    }
    
    let response = await tradePost('/series', createSeriesBody)
    return response
}