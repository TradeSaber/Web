import Rarity from '../models/Rarity'

interface RarityOptionsProps {
    rarities: Rarity[]
}

export default function RarityOptions({ rarities }: RarityOptionsProps) {
    
    let rarityOptions: JSX.Element[] = []
    rarityOptions.push(<option key={'-- SELECT --'} value={'-- SELECT --'}>{'-- SELECT --'}</option>)

    for (let i = 0; i < rarities.length; i++) {
        const rarity = rarities[i]
        rarityOptions.push(<option key={rarity.name} value={rarity.name}>{rarity.name} [{Math.round(rarity.probability * 100)}%]</option>)
    }

    return (<>{rarityOptions}</>)
}