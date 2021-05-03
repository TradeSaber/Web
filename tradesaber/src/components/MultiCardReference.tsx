import { useState } from 'react'
import { Button, Form } from 'react-bulma-components'
import useAllSeries from '../data/useAllSeries'
import { CreatePackCardReference } from '../lib/create/createPack'

interface MultiCardReferenceProps {
    value: CreatePackCardReference[]
    onChange?: ((cards: CreatePackCardReference[]) => void)
}

interface CardFieldProps {
    value: CreatePackCardReference
    onChange: ((card: CreatePackCardReference) => void) 
    onDelete: ((card: CreatePackCardReference) => void)
}

interface ListProps {
    cardlist: CreatePackCardReference[]
}

export default function MultiCardReference({ value, onChange }: MultiCardReferenceProps) {
    const { series } = useAllSeries()
    const [cardList, setCardList] = useState<CreatePackCardReference[]>(value)
    
    function update(reference: CreatePackCardReference) {
        const index = cardList.findIndex(c => c.card.id === reference.card.id)
        if (index !== -1) {
            cardList[index] = reference
            setCardList(cardList.filter(p => true))
        }
        
        if (onChange) {
            onChange(cardList)
        }
    }

    function remove(reference: CreatePackCardReference) {
        let newList: CreatePackCardReference[] = []
        for (let i = 0; i < cardList.length; i++) {
            if (cardList[i].card.id === reference.card.id)
                continue
            newList.push(cardList[i])
        }
        setCardList(newList)

        if (onChange) {
            onChange(cardList)
        }
    }

    function CardField({ value }: CardFieldProps) {
        const cardSeries = series.find(s => s.id === value.card.series)

        const [cardRef, setCardRef] = useState(value)
        const [boost, setBoost] = useState((value.boost ?? 1) + '')
        const [guaranteed, setGuaranteed] = useState(value.guaranteed ?? false)

        return (
            <>
                <Form.Field>
                    <Form.Label>
                        {value.card.name} [{cardSeries?.name ?? '???'}]
                    </Form.Label>
                </Form.Field>
                <Form.Field kind="group">
                    <Form.Control>
                        <Button color="danger" onClick={() => remove(value)}>-</Button>
                    </Form.Control>
                    <Form.Control>
                        <Form.Input placeholder="Boost" value={boost} onChange={(e) => {
                            setBoost(e.target.value)
                            if (!Number.isNaN(parseFloat(e.target.value))) {
                                const newRef = {
                                    ...cardRef,
                                    boost: parseFloat(e.target.value)
                                }
                                setCardRef(newRef)
                                update(newRef)
                            }
                        }} color={parseFloat(boost) ? undefined : 'danger'} />
                    </Form.Control>
                    <Form.Control>
                        <Button onClick={() => {
                            const newRef = {
                                ...cardRef,
                                guaranteed: !guaranteed
                            }
                            setGuaranteed(!guaranteed)
                            setCardRef(newRef)
                            update(newRef)
                        }} color={guaranteed ? 'success' : 'danger'}>Guaranteed</Button>
                    </Form.Control>
                </Form.Field>
            </>
        )
    }

    function CardList({ cardlist }: ListProps) {
        let list: JSX.Element[] = []

        for (let i = 0; i < cardlist.length; i++) {
            list.push(<CardField key={cardlist[i].card.id} value={cardlist[i]} onChange={update} onDelete={remove} />)
        }

        return <>{list}</>
    }

    return (
        <>
            <CardList cardlist={value} />
        </>
    )
}