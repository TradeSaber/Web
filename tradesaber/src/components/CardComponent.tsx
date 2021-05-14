import { Box, Content, Image, Media } from 'react-bulma-components'
import { TRADESABER_BASE_URL } from '../env'
import CardModel from '../models/Card'

interface CardProps {
    card: CardModel
}

export default function CardComponent({ card }: CardProps) {
    console.log(`${TRADESABER_BASE_URL}${card.coverURL}`)
    return (
        <Image src={`${TRADESABER_BASE_URL}${card.coverURL}`} />
    )
}