import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { BiSolidLike, BiLike } from "react-icons/bi";
import { IoEllipsisVerticalSharp } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import { deletePost } from '../services/Post';
import { likeOrUnlike } from '../services/Like';
import { useSelector } from 'react-redux';

const Post = ({ id, image, details, likes, user, image_id }) => {

    const navigate = useNavigate()

    const token = JSON.parse(localStorage.getItem('token'))
    const userId = JSON.parse(localStorage.getItem('id'))

    const hasUserLiked = likes.some(like => like.user == userId);


    const handleClick = () => {
        navigate(`/${id}`)
    }

    const handleDelete = async () => {
        const loadingToastId = toast.loading('Deleting post...')
        const response = await deletePost(id)
        if (response.success) {
            toast.success('Post deleted.', { id: loadingToastId })
            window.location.reload()
        } else {
            toast.error('Could not delete post.', { id: loadingToastId })
        }
    }

    const handleLikeOrUnlike = async () => {
        if (!token) {
            toast.error('Please login or sign in.')
            return null
        }
        const response = await likeOrUnlike(id)
        if (response.success) {
            window.location.reload()
        } else {
            toast.error('Error while liking the post')
        }
    }

    console.log(likes)

    return (
        <div className='relative px-2 py-4 rounded bg-Background shadow shadow-secondary flex flex-col gap-2'>

            {/* div that contains the profile pic and the name of the creator of the post */}
            <div className=' flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <span className='h-8 w-8 text-center py-1 text-md bg-primary text-Background rounded-full cursor-pointer'>
                        {
                            user.name.slice(0, 2)
                        }
                    </span>
                    <p className='cursor-pointer'>
                        {
                            user.name
                        }
                    </p>
                </div>
                <div className='group cursor-pointer'>
                    {
                        image_id && <IoEllipsisVerticalSharp size={20} />
                    }
                    <div className='px-1 py-2 absolute top-12 right-2 bg-Background rounded hidden group-hover:flex flex-col gap-1 transition-all duration-200 ease-in-out'>
                        <p className='ps-2 pr-6 cursor-pointer' onClick={handleDelete}>delete</p>
                        <p className='ps-2 pr-6 cursor-pointer'>edit</p>
                    </div>
                </div>
            </div>

            {/* main image of the post */}
            <img onClick={handleClick} src={image} alt="no image found" className='text-primary cursor-pointer rounded w-full h-60 object-cover' />

            <p>
                {
                    details.length > 35 ? details.slice(0, 35) + "..." : details
                }
            </p>

            {/* likes section */}
            <button onClick={handleLikeOrUnlike} className='flex items-center justify-center gap-2 cursor-pointer'>
                {
                    hasUserLiked ? <BiSolidLike size={20} /> : <BiLike size={20} />
                }
                {

                    likes.length > 0 ? `${likes.length + " likes"}` : "No like"
                }
            </button>
        </div>
    )
}

export default Post