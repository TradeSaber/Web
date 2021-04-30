import useSWR from 'swr'
import useTradeFetch from '../lib/useTradeFetch'
import Inventory from '../models/Inventory'
import User from '../models/User'

export default function useInventory(user: User, self?: boolean) {
    user.valueOf()
    const { data, mutate, error } = useSWR('/inventory/' + (self ? '@me' : user.id), useTradeFetch)

    const loading = !data && !error
    
    return {
        loading,
        inventory: data as Inventory,
        mutate
    }
}