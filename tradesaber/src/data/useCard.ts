import useSWR from 'swr'
import tradeFetch from '../lib/useTradeFetch'
import Card from '../models/Card'

export default function useCard(id: string) {
    const { data, mutate, error } = useSWR(id !== "" ? `/cards/${id}` : null, tradeFetch)
    const loading = !data && !error

    return {
        loading,
        card: data as Card ?? null,
        mutate
    }
}