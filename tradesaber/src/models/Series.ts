import ColorTheme from './ColorTheme'

export default interface Series {
    id: string
    name: string
    description: string
    iconURL: string
    bannerURL: string
    theme: ColorTheme
    cards: string[]
}

export interface SeriesReference {
    boost: number | null
    series: string
}