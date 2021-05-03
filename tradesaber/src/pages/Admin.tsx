import React from 'react'
import CreateCard from '../components/create/CreateCard'
import CreateRarity from '../components/create/CreateRarity'
import CreateSeries from '../components/create/CreateSeries'

export default function Admin() {
    return (
        <>
            <CreateSeries />
            <CreateRarity />
            <CreateCard />
        </>
    )
}