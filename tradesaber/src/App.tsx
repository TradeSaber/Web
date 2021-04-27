import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Login from './components/Login'
import TradeNav from './components/TradeNav'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function App() {

    let query = useQuery()

    return (
        <div>
            <TradeNav />
            <Switch>
                <Route path="/login">
                    <Login code={query.get('code')} />
                </Route>
            </Switch>
        </div>
    )
}

export default App
