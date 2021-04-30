import React from 'react'
import CreateSeries from '../components/create/CreateSeries'
import useUser from '../data/useUser'


export default function Admin() {

    const { user } = useUser()

    return (
        <>
            <CreateSeries uploader={user} />
        </>
    )
}