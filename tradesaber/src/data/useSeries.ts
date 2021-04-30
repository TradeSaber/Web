import useSWR from 'swr'
import tradeFetch from '../lib/useTradeFetch'
import Series from '../models/Series'

export default function useSeries(id: string) {
    const { data, mutate, error } = useSWR(id !== "" ? `/series/${id}` : null, tradeFetch)
    const loading = !data && !error

    return {
        loading,
        series: data as Series ?? null,
        mutate
    }
}