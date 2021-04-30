import useSWR from 'swr'
import tradeFetch from '../lib/useTradeFetch'
import Series from '../models/Series'


export default function useAllSeries() {
    const { data, mutate, error } = useSWR('/series', tradeFetch)
    const loading = !data && !error && localStorage.getItem('token')

    return {
        loading,
        series: data as Series[] ?? null,
        mutate
    }
}