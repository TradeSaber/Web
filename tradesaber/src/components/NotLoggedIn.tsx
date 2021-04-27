import React from 'react'
import { Container, Button, Message } from 'react-bulma-components'
import { TRADESABER_API_URL } from '../env'

function NotLoggedIn() {

    return (
        <Container>
            <Message color="danger">
                <Message.Header>
                    <span>
                        Hey!
                    </span>
                </Message.Header>
                <Message.Body>
                    This page is unavailable. You are not logged in.
                    <br />
                    <br />
                    <Button onClick={() => window.location.href = `${TRADESABER_API_URL}/auth`}>
                        Log In
                    </Button>
                </Message.Body>
            </Message>
        </Container>
    )
}

export default NotLoggedIn