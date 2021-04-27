import { Settings } from 'node:http2';
import DiscordUser from './discordUser'
import Role from './Role';

export default interface User {
    id: string
    profile: DiscordUser
    role: Role | null
    xp: number
    settings: Settings
}