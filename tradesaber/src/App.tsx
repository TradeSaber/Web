import React from 'react'
import { Container, Section } from 'react-bulma-components'
import { Switch, Route, useLocation } from 'react-router-dom'
import Login from './components/Login'
import TradeNav from './components/TradeNav'
import TradeRoute from './custom/TradeRoute'
import Admin from './pages/Admin'
import Cards from './pages/collections/Cards'
import Profile from './pages/Profile'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function App() {

    let query = useQuery()

    return (
        <div>
            <TradeNav />
            <Section>
                <Container>
                    <Switch>
                        <Route path="/login">
                            <Login code={query.get('code')} />
                        </Route>
                        <TradeRoute path="/profile">
                            <Profile />
                        </TradeRoute>
                        <TradeRoute path="/admin" scopes={['create:series']}>
                            <Admin />
                        </TradeRoute>
                        <Route path="/cards">
                            <Cards />
                        </Route>
                    </Switch>
                </Container>
            </Section>
        </div>
    )
}

export default App