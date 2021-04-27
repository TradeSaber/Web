import axios from 'axios'
import { TRADESABER_API_URL } from '../env'

export default async function useTradeFetch(url: string) {
    let authHeader: any = null
    let token = localStorage.getItem('token')
    if (token) {
        authHeader = { Authorization: `Bearer ${token}`}
    }
    let axiosResponse = await axios.get(`${TRADESABER_API_URL}${url}`, { headers: authHeader })
    return axiosResponse.data
}