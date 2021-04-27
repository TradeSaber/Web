import React from 'react'
import { Section } from 'react-bulma-components'
import { Switch, Route, useLocation } from 'react-router-dom'
import Login from './components/Login'
import TradeNav from './components/TradeNav'
import TradeRoute from './custom/TradeRoute'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function App() {

    let query = useQuery()

    return (
        <div>
            <TradeNav />
            <Section>
                <Switch>
                    <Route path="/login">
                        <Login code={query.get('code')} />
                    </Route>
                    <TradeRoute path="/profile">
                        <p>uwu we authed</p>
                    </TradeRoute>
                </Switch>
            </Section>
        </div>
    )
}

export default App