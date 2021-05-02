import axios, { AxiosRequestConfig } from 'axios'
import { TRADESABER_API_URL } from '../env'

export default async function tradePost(url: string, body?: any, config?: AxiosRequestConfig) {
    let authHeader: any = null
    let token = localStorage.getItem('token')
    if (token) {
        authHeader = { Authorization: `Bearer ${token}`}
    }
    let axiosResponse = await axios.post(`${TRADESABER_API_URL}${url}`, body, { ...config, headers: authHeader })
    return axiosResponse
}