import useSWR from 'swr'
import tradeFetch from '../lib/useTradeFetch'
import Pack from '../models/Pack'

export default function usePack(id: string) {
    const { data, mutate, error } = useSWR(id !== "" ? `/packs/${id}` : null, tradeFetch)
    const loading = !data && !error

    return {
        loading,
        pack: data as Pack ?? null,
        mutate
    }
}