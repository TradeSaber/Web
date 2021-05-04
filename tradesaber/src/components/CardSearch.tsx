import { useState } from 'react'
import { Button, Form } from 'react-bulma-components'
import useCards from '../data/useCards'
import Card from '../models/Card'
import CardOptions from './CardOptions'

interface CardSearchProps {
    onAdd?: ((card: Card) => void)
}

export default function CardSearch({ onAdd }: CardSearchProps) {

    const { cards } = useCards()
    const [activeCards, setActiveCards] = useState<Card[]>([])

    const [search, setSearch] = useState('')
    const [activeCard, setActiveCard] = useState('')

    function searchForCards(phrase: string) {
        setSearch(phrase)
        if (phrase === '') {
            setActiveCards([])
            return
        }
        setActiveCards(cards.filter(c => c.name.toLowerCase().includes(phrase.toLowerCase())))
    }

    function add() {
        if (activeCard === '')
            return
        
        const card = cards.find(c => c.id === activeCard)
        if (card !== undefined && onAdd !== undefined)
            onAdd(card)
    }

    return (
        <>
            <Form.Control fullwidth={true}>
                <Form.Input placeholder="...some card name." value={search} onChange={(e) => searchForCards(e.target.value)}>

                </Form.Input>
            </Form.Control>
            <Form.Control>
                <Form.Select value={activeCard} onChange={(e) => setActiveCard(e.target.value !== '-- SELECT --' ? e.target.value : '')}>
                    <CardOptions cards={activeCards} />
                </Form.Select>
            </Form.Control>
            <Form.Control>
                <Button type="button" disabled={activeCard === ''} onClick={() => add()}>
                    Add
                </Button>
            </Form.Control>
        </>
    )
}