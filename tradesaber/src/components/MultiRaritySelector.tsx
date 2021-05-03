import { useState } from 'react'
import { Button } from 'react-bulma-components'
import useRarities from '../data/useRarities'
import Rarity from '../models/Rarity'
import RarityOption from './RarityOption'

interface MultiRaritySelectorProps {
    value?: Rarity[]
    onChange?: ((rarities: Rarity[]) => void)
}

interface ListProps {
    raritylist: Rarity[]
}

export default function MultiRaritySelector({ value, onChange }: MultiRaritySelectorProps) {
    const { rarities } = useRarities()
    const [rarityList, setRarityList] = useState<Rarity[]>(value ?? [])

    function update(key: number, rarityName: string) {
        const rarity = rarities.find(r => r.name === rarityName)
        if (rarity !== undefined) {
            rarityList[key] = rarity
            setRarityList(rarityList.filter(p => true))
        }
        else {
            rarityList[key] = { name: '-- SELECT --', color: '#000000', probability: 0 }
        }

        if (onChange) {
            onChange(rarityList)
        }
    }

    function remove(key: number) {
        let newList: Rarity[] = []
        for (let i = 0; i < rarityList.length; i++) {
            if (i !== key)
                newList.push(rarityList[i])
        }
        setRarityList(newList)

        if (onChange) {
            onChange(rarityList)
        }
    }

    function RarityList({ raritylist }: ListProps) {
        let list: JSX.Element[] = []
        
        for (let i = 0; i < raritylist.length; i++) {
            list.push(<RarityOption key={i} index={i} value={raritylist[i]} onChange={(w) => update(i, w)} onDelete={remove} />)
        }

        return <>{list}</>
    }

    return (
        <>
            <RarityList raritylist={rarityList} />
            <Button onClick={() => {
                rarityList.push({ name: '-- SELECT --', color: '#000000', probability: 0 })
                setRarityList(rarityList.filter(p => true))
            }}>+</Button>
        </>
    )
}