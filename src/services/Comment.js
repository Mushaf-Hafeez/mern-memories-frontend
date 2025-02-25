import { api } from './Auth'

export const postComment = async (postId, text) => {
    try {

        const response = await api.post(`comment/${postId}`, {
            text
        })

        if (response.data.success) {
            return response.data
        }

    } catch (error) {
        console.log('Error Message: ', error.message)
        console.log('Error Status: ', error.response.status)
        console.log('Error Data: ', error.response.data)
        return error.response.data
    }
}