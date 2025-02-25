import { api } from "./Auth";

export const createPost = async (data) => {
    try {

        const response = await api.post('/create', data)

        if (response.data.success) {
            console.log('response data: ', response.data)
            return response.data
        }

    } catch (error) {
        console.log('Error Message: ', error.message)
        console.log('Error Status: ', error.response.status)
        console.log('Error Data: ', error.response.data)
        return error.response.data
    }
}

export const deletePost = async (postId) => {
    try {

        const response = await api.delete(`/delete/${postId}`)

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