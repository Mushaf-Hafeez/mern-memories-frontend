import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { createPost } from '../services/Post'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const loadingToastId = toast.loading('Creating a post...')
    const formData = new FormData()
    formData.append('details', data.details)
    formData.append('image', data.image[0])
    const response = await createPost(formData)
    if (response.success == true) {
      toast.success('Post has been created.', { id: loadingToastId })
      reset()
      navigate('/')
      
    } else {
      toast.error('Failed to create post.', { id: loadingToastId })
    }
  }

  return (
    <div className='min-h-[83vh] w-full px-10 md:px-20 lg:px-40 flex items-center justify-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full md:w-[40%] p-5 flex flex-col gap-4 bg-secondary/20 text-primary rounded'
      >
        <h1 className='text-2xl font-semibold text-center'>
          Create a post
        </h1>

        {/* select the post image */}
        <div className='flex flex-col gap-2'>
          <label
            htmlFor="image"
            className='p-3 rounded bg-secondary/50 outline-none cursor-pointer'>
            Upload an image
          </label>
          <input
            type="file"
            className='hidden'
            accept="image/*"
            id="image"
            {...register("image", { required: true })} />
        </div>

        {

        }

        {/* image details*/}
        <div className='flex flex-col gap-2'>
          <label
            htmlFor="details">
            Details
          </label>
          <input
            type="text"
            className='p-3 rounded bg-secondary/50 outline-none'
            placeholder='Enter the details of the post here...'
            id="details"
            {...register("details", { required: true, maxLength: 250 })} />
        </div>
        <input type="submit" className='p-3 bg-primary text-Background cursor-pointer font-semibold rounded active:bg-primary/60' />

        {
          errors.image && <p className='text-red text-md'>Image is required</p>
        }
        {
          errors.details && <p className='text-red text-md'>Details are required and does not contains more than 250 characters.</p>
        }

      </form>
    </div>
  )
}

export default CreatePost