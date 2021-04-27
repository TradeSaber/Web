import User from './User'

export default interface Media {
    id: string
    fileSize: number
    path: string
    mimeType: string
    fileHash: string
    uploader?: User
}