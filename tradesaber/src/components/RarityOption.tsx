import { useState } from 'react'
import Rarity from '../models/Rarity'
import RarityOptions from './RarityOptions'
import useRarities from '../data/useRarities'
import { Button, Form } from 'react-bulma-components'

interface OptionProps {
    index: number
    value: Rarity
    onChange: ((rarityName: string) => void)
    onDelete: ((index: number) => void)
}

export default function RarityOption({ index, value, onChange, onDelete }: OptionProps) {
    const { rarities } = useRarities()
    const [rarityValue, setRarityValue] = useState(value.name)

    function update(name: string) {
        setRarityValue(name)
        onChange(name)
    }

    return (
        <>
            <Form.Control>
                <Button color="danger" onClick={() => onDelete(index)}>-</Button>
                <Form.Select value={rarityValue} onChange={(e) => update(e.target.value)}>
                    <RarityOptions rarities={rarities} />
                </Form.Select>
            </Form.Control>
        </>
    )
}