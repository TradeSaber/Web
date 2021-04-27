import { useState } from 'react'

export default function useToken() {
    
    const getToken = () => {
        const tokenValue = localStorage.getItem('token')
        return tokenValue;
    }
    
    const [token, setToken] = useState(getToken())

    const saveToken = (tokenValue: string | null) => {

        if (tokenValue === null) {
            localStorage.removeItem('token')
            setToken(null)
        }
        else {
            localStorage.setItem('token', tokenValue)
            setToken(tokenValue)
        }
    }

    return {
        setToken: saveToken,
        token
    }
}