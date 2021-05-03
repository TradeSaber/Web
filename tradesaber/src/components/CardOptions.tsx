import useAllSeries from '../data/useAllSeries'
import Card from '../models/Card'

interface CardOptionsProps {
    cards: Card[]
}

export default function CardOptions({ cards }: CardOptionsProps) {
    const { series } = useAllSeries()
    let cardOptions: JSX.Element[] = []
    cardOptions.push(<option key={'-- SELECT --'} value={'-- SELECT --'}>{'-- SELECT --'}</option>)

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        const cardSeries = series.find(s => s.id === card.series)
        cardOptions.push(<option key={card.id} value={card.id}>{card.name} [{cardSeries?.name ?? '???'}]</option>)
    }

    return (<>{cardOptions}</>)
}