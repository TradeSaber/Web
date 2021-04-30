import useSWR from 'swr'
import tradeFetch from '../lib/useTradeFetch'
import Pack from '../models/Pack'

export default function useShop() {
    const { data, mutate, error } = useSWR('/shop', tradeFetch)
    const loading = !data && !error

    return {
        loading,
        packsOnSale: data as Pack[] ?? null,
        mutate
    }
}