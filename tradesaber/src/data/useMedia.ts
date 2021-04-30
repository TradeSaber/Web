import useSWR from 'swr'
import tradeFetch from '../lib/useTradeFetch'
import Media from '../models/Media'

export default function useMedia() {
    const { data, mutate, error } = useSWR('/media', tradeFetch)
    const loading = !data && !error

    return {
        loading,
        media: data as Media[] ?? null,
        mutate
    }
}