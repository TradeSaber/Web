import useSWR from 'swr'
import tradeFetch from '../lib/useTradeFetch'
import Rarity from '../models/Rarity'

export default function useRarities() {
    const { data, mutate, error } = useSWR('/rarity', tradeFetch)
    const loading = !data && !error

    return {
        loading,
        rarities: data as Rarity[] ?? null,
        mutate
    }
}