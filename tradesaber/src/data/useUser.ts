import useSWR from 'swr'
import tradeFetch from '../lib/useTradeFetch'
import User from '../models/User'


export default function useUser() {
    const { data, mutate, error } = useSWR(localStorage.getItem('token') !== null ? '/auth/@me' : null, tradeFetch)
    const loading = !data && !error
    const loggedOut = error && error.status === 403

    return {
        loading,
        loggedOut,
        user: data as User ?? null,
        mutate
    }
}