import { api } from "./Auth";

export const likeOrUnlike = async (postId) => {
    try {

        const response = await api.put(`/like/${postId}`)

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