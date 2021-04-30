import useAllSeries from '../data/useAllSeries'
import useInventory from '../data/useInventory'
import useMedia from '../data/useMedia'
import useUser from '../data/useUser'

function Profile() {
    const { user } = useUser()
    const { media } = useMedia()
    const { series } = useAllSeries()
    const { inventory } = useInventory(user, true)
    
    return (
        <>{inventory?.id}<br />{series?.length}<br />{media?.length}</>
    )
}

export default Profile