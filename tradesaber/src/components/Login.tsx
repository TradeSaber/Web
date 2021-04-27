import React, { useEffect } from 'react'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import useToken from '../data/useToken'
import fetchToken from '../data/useTokenFetch'
import useUser from '../data/useUser'

interface LoginProps {
    code: string | null
}

export default function Login({ code } : LoginProps) {
    
    const { user, mutate } = useUser()
    const { token: tV, setToken } = useToken()
    const { loading, token } = fetchToken(code!)

    const [didToken, setDidToken] = useState(false)

    useEffect(() => {
        if (!loading && token) {
            setToken(token)
            mutate(user, true)
            setDidToken(true)
        }
    }, [mutate, setToken, loading, token, tV, user])
    
    if (code === null) {
        return (
            <p>No code detected.</p>
        )
    }

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
    else {
        if (token && didToken) {
            return (
                <Redirect to="/" />
            )
        } else {
            return (
                <div>
                    <p>An error has occured.</p>
                </div>
            )
        }
    }
}