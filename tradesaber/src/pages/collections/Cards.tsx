import CardComponent from '../../components/CardComponent'
import Loading from '../../components/Loading'
import useCards from '../../data/useCards'
import Card from '../../models/Card'

interface CardGenProps {
    cards: Card[]
}

function Cards() {

    const { cards } = useCards()

    if (cards === null)
        return <Loading />

    function CardGen({ cards }: CardGenProps) {
        let list: JSX.Element[] = []
        for (let i = 0; i < cards.length; i++) {
            list.push(<CardComponent key={cards[i].id} card={cards[i]} />)
        }
        return <>{list}</>
    }

    return (
        <>
            <CardGen cards={cards} />
        </>
    )
}

export default Cards