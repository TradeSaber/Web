import React, { useEffect } from 'react'
import { Container, Navbar } from 'react-bulma-components'
import smallLongLogo from '../assets/logo-long-small.png'
import useToken from '../data/useToken'
import useUser from '../data/useUser'
import { TRADESABER_API_URL } from '../env'

interface EndBarProps {
    user: any
}

function EndBar({ user }: EndBarProps) {
    
    if (user !== null) {
        return (
            <>
                <Navbar.Item href="#">
                    <b>{user.profile.username}</b>
                </Navbar.Item>
            </>
        )
    }
    return (<></>)
}

function TradeNav() {

    const { user, mutate } = useUser()
    const { token, setToken } = useToken()

    useEffect(() => {
        mutate()
    }, [token, mutate])

    return (
        <Navbar color="primary">
            <Container>
                <Navbar.Brand>
                    <Navbar.Item renderAs="a" href="#">
                        <img src={smallLongLogo} alt="Trade Saber Logo"  />
                    </Navbar.Item>
                </Navbar.Brand>
                <Navbar.Menu>
                    <Navbar.Container>
                        <Navbar.Item hoverable href="#">
                            Home
                        </Navbar.Item>
                        <Navbar.Item dropdown hoverable href="#">
                            <Navbar.Link arrowless={false}>
                                Collections
                            </Navbar.Link>
                            <Navbar.Dropdown>
                                <Navbar.Item href="#">
                                    Cards
                                </Navbar.Item>
                                <Navbar.Item href="#">
                                    Series
                                </Navbar.Item>
                                <Navbar.Item href="#">
                                    Packs
                                </Navbar.Item>
                            </Navbar.Dropdown>
                        </Navbar.Item>
                        <Navbar.Item href="#">
                            Download
                        </Navbar.Item>
                        <Navbar.Item href="#">
                            FAQ
                        </Navbar.Item>
                    </Navbar.Container>
                    <Navbar.Container position="end">
                        <EndBar user={user} />
                        <Navbar.Item href="#" onClick={() => {
                            if (user !== null) {
                                setToken(null!)
                                mutate(null)
                            }
                            else {
                                window.location.href = `${TRADESABER_API_URL}/auth`
                            }
                        }}>
                            {user === null ? 'Log In' : 'Log Out'}
                        </Navbar.Item>
                    </Navbar.Container>
                </Navbar.Menu>
            </Container>
        </Navbar>
    )
}

export default TradeNav