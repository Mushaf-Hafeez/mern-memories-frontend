import React, { useEffect, useState } from 'react'
import { api } from '../services/Auth'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { LuSendHorizontal } from "react-icons/lu";
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { postComment } from '../services/Comment'

const Post = () => {

    // token
    const { token } = useSelector(state => state.auth)

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { id } = useParams()
    const [post, setPost] = useState()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)


    const getPost = async () => {
        setIsLoading(true)
        try {

            const response = await api.get(`/post/${id}`)

            if (response.data.success == true) {
                delete response.data.data.user.password
                setPost(response.data.data)
                console.log('single post data is: ', response.data.data)
            }

        } catch (error) {
            console.log('Error while getting single post data: ', error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const onSubmit = async (data) => {
        // you have to send the comment api request to the backend
        const loadingToastId = toast.loading('Posting comment...')
        const response = await postComment(id, data.comment)
        if (response.success) {
            reset()
            toast.success('Comment posted.', { id: loadingToastId })

            setTimeout(() => {
                window.location.reload()
            }, 500)

        } else {
            toast.error('Error while posting comment.', { id: loadingToastId })
        }
    }

    useEffect(() => {
        getPost()
    }, [id])

    return (
        <div className='h-full w-full px-10 md:px-20 lg:px-40 text-primary'>
            <div className='mb-2'>
                <Link to={-1}>
                    <HiOutlineArrowSmLeft size={24} />
                </Link>
            </div>
            {
                isLoading ? (
                    <div className='flex justify-center'>
                        <Spinner />
                    </div>
                ) : (
                    <div>
                        {
                            post ? (
                                <div className='w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-5'>
                                    {/* post image */}
                                    <a href={post.image} target='_blank'>
                                        <img src={post.image} alt="post image not found." className='rounded cursor-pointer' />
                                    </a>

                                    {/* details section */}
                                    <div className='flex flex-col gap-2'>
                                        {/* creator details */}
                                        <h2>Creator: </h2>
                                        <p className='ps-10'>{post?.user?.name + "."}</p>

                                        {/* post title */}
                                        <h2>Title: </h2>
                                        <p className='ps-10'>{post?.details}</p>

                                        {/* comments section */}
                                        <div className='flex flex-col gap-2'>
                                            <h2>Comments: </h2>
                                            <form
                                                onSubmit={handleSubmit(onSubmit)}
                                                className='flex items-center gap-2' >
                                                <input
                                                    type="text"
                                                    disabled={token ? false : true}
                                                    maxLength={250}
                                                    placeholder='Enter a comment...'
                                                    {...register('comment', { maxLength: 50 })}
                                                    className={`p-3 rounded bg-secondary/50 outline-none w-full ${token ? "cursor-text" : "cursor-not-allowed"} `} />
                                                <button
                                                    type='submit'
                                                    disabled={token ? false : true}
                                                    className={`rounded-full p-3 bg-secondary ${token ? "cursor-pointer" : "cursor-not-allowed"}`}>
                                                    <LuSendHorizontal size={20} />
                                                </button>
                                            </form>
                                            {
                                                errors.comment && <p className='text-red'>Comment does not contains more than 50 characters.</p>
                                            }
                                            <div className='max-h-90 overflow-y-auto flex flex-col gap-2'>
                                                {
                                                    post.comments.length > 0 ? (
                                                        post.comments.map((comment, index) => (
                                                            <div key={index} className='flex item-center gap-2'>

                                                                <span className='h-8 w-8 text-center py-1 text-md bg-primary text-Background rounded-full cursor-pointer'>
                                                                    {
                                                                        comment.user.name.slice(0, 2)
                                                                    }
                                                                </span>

                                                                <div className='flex flex-col'>
                                                                    <h3 className='font-semibold'>
                                                                        {
                                                                            comment.user.name
                                                                        }
                                                                    </h3>
                                                                    <p className='text-primary/80'>
                                                                        {
                                                                            comment.text
                                                                        }
                                                                    </p>

                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : ("No Comment yet.")
                                                }
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            ) : (
                                <p>
                                    single post data not found.
                                </p>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Post