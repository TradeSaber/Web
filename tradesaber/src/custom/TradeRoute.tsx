import { ReactNode } from 'react'
import { Route } from 'react-router'
import NotLoggedIn from '../components/NotLoggedIn'
import Loading from '../components/Loading'
import useUser from '../data/useUser'

interface IProps {
    children: ReactNode
    scopes?: string[] 
    path: string
}


function TradeRoute({ children, scopes, path }: IProps) {

    const { user, loading } = useUser()

    function allowed() {
        if (user === null)
            return false

        if (user.role === null)
            return false
        console.log(user)        
        if (scopes !== undefined) {
            let didFind = false
            scopes.forEach(element => {
                if (user.role?.scopes.find(v => v === element)) {
                    didFind = true
                    return
                }
            });
            return didFind
        }
        return true
    }

    return (
        <Route path={path} render={() => {
            return allowed() ? children : (loading ? <Loading /> : <NotLoggedIn /> )
        }} />
    )
}

export default TradeRoute