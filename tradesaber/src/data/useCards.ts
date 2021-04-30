import useSWR from 'swr'
import tradeFetch from '../lib/useTradeFetch'
import Card from '../models/Card'

export default function useCards() {
    const { data, mutate, error } = useSWR('/cards', tradeFetch)
    const loading = !data && !error

    return {
        loading,
        series: data as Card[] ?? null,
        mutate
    }
}