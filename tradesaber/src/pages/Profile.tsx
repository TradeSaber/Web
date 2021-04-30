import useAllSeries from '../data/useAllSeries'
import useInventory from '../data/useInventory'
import useUser from '../data/useUser'

function Profile() {
    const { user } = useUser()
    const { series } = useAllSeries()
    const { inventory } = useInventory(user, true)
    
    return (
        <>{inventory?.id}<br />{series?.length}</>
    )
}

export default Profile