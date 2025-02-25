import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner'
import Post from '../components/Post'
import { api } from '../services/Auth'

const Posts = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    setIsLoading(true)
    try {

      const response = await api.get('/posts')

      if (response.data.success == true) {
        setPosts(response.data.data)
        // console.log('data is: ', response.data.data)
      }

    } catch (error) {
      console.log('Error while getting the posts:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className='h-full w-full px-10 md:px-20 lg:px-40 text-primary'>
      {
        isLoading ? (
          <div className='flex justify-center'>
            <Spinner />
          </div>
        ) : (
          <div>
            {
              posts.length > 0 ? (
                <div className='w-full h-full grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                  {
                    posts.map(post => (
                      <Post key={post._id} id={post._id} image={post.image} details={post.details} likes={post.likes} user={post.user}/>
                    ))
                  }
                </div>
              ) : (
                <p>No post found.</p>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default Posts