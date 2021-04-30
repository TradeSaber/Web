import useSWR from 'swr'
import tradeFetch from '../lib/useTradeFetch'
import Mutation from '../models/Mutation'

export default function useMedia() {
    const { data, mutate, error } = useSWR('/mutation', tradeFetch)
    const loading = !data && !error

    return {
        loading,
        mutations: data as Mutation[] ?? null,
        mutate
    }
}