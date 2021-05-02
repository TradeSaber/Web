import tradePost from '../tradePost'

export default async function uploadMedia(file: File, downloadProgress?: (progress: number) => void) {
    const uploadBody = new FormData()
    uploadBody.append('file', file)
    let response = await tradePost('/media/create', uploadBody, {
        onUploadProgress: progressEvent => {
            if (downloadProgress)
                downloadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
        }
    });
    return response
}