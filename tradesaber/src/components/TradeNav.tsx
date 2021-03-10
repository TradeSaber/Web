import React, { Component } from 'react'
import { Container, Navbar } from 'react-bulma-components'
import smallLongLogo from '../assets/logo-long-small.png'

export default class TradeNav extends Component {
    render() {
        return (
            <Navbar color="primary">
                <Container>
                    <Navbar.Brand>
                        <Navbar.Item renderAs="a" href="#">
                            <img src={smallLongLogo} alt="Trade Saber Logo"  />
                        </Navbar.Item>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}