import React from 'react'
import { Container, Navbar } from 'react-bulma-components'
import smallLongLogo from '../assets/logo-long-small.png'

function TradeNav() {
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
                        <Navbar.Item href="#">
                            Log In
                        </Navbar.Item>
                    </Navbar.Container>
                </Navbar.Menu>
            </Container>
        </Navbar>
    )
}

export default TradeNav