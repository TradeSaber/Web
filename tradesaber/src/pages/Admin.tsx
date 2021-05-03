import React from 'react'
import { Box, Button, Heading, Tile } from 'react-bulma-components'
import CreateCard from '../components/create/CreateCard'
import CreatePack from '../components/create/CreatePack'
import CreateRarity from '../components/create/CreateRarity'
import CreateSeries from '../components/create/CreateSeries'

export default function Admin() {
    return (
        <>
            <Tile>
                <Tile>
                    <Tile>
                        <Box>
                            <Heading>Create</Heading>
                            <Button.Group>
                                <CreateSeries />
                                <CreateRarity />
                                <CreateCard />
                                <CreatePack />
                            </Button.Group>
                        </Box>
                    </Tile>
                </Tile>
            </Tile>
        </>
    )
}