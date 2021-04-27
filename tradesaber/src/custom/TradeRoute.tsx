import { ReactNode } from 'react'
import { Route } from 'react-router'
import NotLoggedIn from '../components/NotLoggedIn'
import Loading from '../components/Loading'
import useUser from '../data/useUser'

interface IProps {
    children: ReactNode
    path: string
}


function TradeRoute({ children, path }: IProps) {

    const { user, loading } = useUser()

    return (
        <Route path={path} render={() => {
            return user !== null ? children : (loading ? <Loading /> : <NotLoggedIn /> )
        }} />
    )
}

export default TradeRoute