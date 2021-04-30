import useSWR from 'swr'
import tradeFetch from '../lib/useTradeFetch'
import Pack from '../models/Pack'

export default function usePacks() {
    const { data, mutate, error } = useSWR('/packs', tradeFetch)
    const loading = !data && !error

    return {
        loading,
        packs: data as Pack[] ?? null,
        mutate
    }
}