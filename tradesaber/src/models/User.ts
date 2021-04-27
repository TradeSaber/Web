import DiscordUser from './DiscordUser'
import Settings from './Settings'
import Role from './Role'

export default interface User {
    id: string
    profile: DiscordUser
    role: Role | null
    xp: number
    settings: Settings
}