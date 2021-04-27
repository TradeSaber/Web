import React from 'react'
import { Section } from 'react-bulma-components'
import { Switch, Route, useLocation } from 'react-router-dom'
import Login from './components/Login'
import NotLoggedIn from './components/NotLoggedIn'
import TradeNav from './components/TradeNav'

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
                    <Route path="/profile">
                        <NotLoggedIn />
                    </Route>
                </Switch>
            </Section>
        </div>
    )
}

export default App
