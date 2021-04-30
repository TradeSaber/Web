import axios from 'axios'
import { TRADESABER_API_URL } from '../env'

export default async function tradePost(url: string, body?: any) {
    let authHeader: any = null
    let token = localStorage.getItem('token')
    if (token) {
        authHeader = { Authorization: `Bearer ${token}`}
    }
    let axiosResponse = await axios.post(`${TRADESABER_API_URL}${url}`, body, { headers: authHeader })
    return axiosResponse
}