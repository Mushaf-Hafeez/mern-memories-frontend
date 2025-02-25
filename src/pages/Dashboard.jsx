import React, { useEffect, useState } from 'react'
import { api } from '../services/Auth'
import Spinner from '../components/Spinner'
import Post from '../components/Post'

const Dashboard = () => {

    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getPosts = async () => {

        setIsLoading(true)

        try {
            const response = await api.get('/myPosts')

            if (response.data.success == true) {
                setPosts(response.data.data)
            }

        } catch (error) {
            console.log('Error while fetching user posts: ', error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className='w-full h-full px-10 md:px-20 lg:px-40 text-primary'>
            {
                isLoading ? (<Spinner />) : (
                    <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {
                            posts.map(post => (
                                <Post key={post._id} id={post._id} image={post.image} image_id={post.image_id} details={post.details} likes={post.likes} user={post.user} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Dashboard