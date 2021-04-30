import tradePost from '../tradePost'

export default async function uploadMedia(file: File) {
    const uploadBody = new FormData()
    uploadBody.append('file', file)
    let response = await tradePost('/media/create', uploadBody);
    return response
}