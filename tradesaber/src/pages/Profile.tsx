import useInventory from '../data/useInventory'
import useUser from '../data/useUser'

function Profile() {
    const { user } = useUser()
    const { inventory } = useInventory(user, true)
    
    console.log(inventory)
    return (
        <>{inventory?.id}</>
    )
}

export default Profile