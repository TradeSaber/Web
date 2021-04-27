import useSWR from 'swr'
import tradeFetch from '../lib/useTradeFetch'

export default function useTokenFetch(code: string) {

    const { data, mutate, error } = useSWR(`/auth/callback?code=${code}`, tradeFetch)
    const loading = !data && !error

    const token = data?.token
    if (token) {
        localStorage.setItem('token', token)
    }

    return {
        loading,
        token,
        mutate
    }
}