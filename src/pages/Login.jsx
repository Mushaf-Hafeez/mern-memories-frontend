import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import { login } from '../services/Auth'
import { useDispatch } from 'react-redux'
import { setToken, setName, setId } from '../redux/slices/Auth'

const Login = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    const loadingToastId = toast.loading('logging in...')
    const response = await login(data.email, data.password)
    if (response.success == true) {
      reset()
      toast.success(response.message, { id: loadingToastId })
      dispatch(setToken(response.data.token))
      dispatch(setName(response.data.name))
      dispatch(setId(response.data._id))
      if (JSON.parse(localStorage.getItem('token')) == null) {
        localStorage.setItem('token', JSON.stringify(response.data.token))
      }
      if (JSON.parse(localStorage.getItem('name')) == null) {
        localStorage.setItem('name', JSON.stringify(response.data.name))
      }
      if (JSON.parse(localStorage.getItem('id')) == null) {
        localStorage.setItem('id', JSON.stringify(response.data._id))
      }
      navigate('/')
    } else {
      toast.error(response.message, { id: loadingToastId })
    }
  }

  return (
    <div className='h-[82vh] w-full px-10 md:px-20 lg:px-40 flex items-center justify-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full md:w-[40%] p-5 flex flex-col gap-4 bg-secondary/20 text-primary rounded'>
        <h1 className='text-2xl font-semibold text-center'>
          Login Form
        </h1>
        <div className='flex flex-col gap-2'>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            className='p-3 rounded bg-secondary/50 outline-none'
            placeholder='Enter email address'
            id='email'
            {...register('email', { required: true })}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="email">Password</label>
          <input
            type="password"
            className='p-3 rounded bg-secondary/50 outline-none'
            placeholder='Enter password'
            id='password'
            {...register('password', { minLength: 8, required: true })}
          />
        </div>
        <input type="submit" className='p-3 bg-primary text-Background cursor-pointer font-semibold rounded active:bg-primary/60' />

        <div>
          {
            errors.email && <p className='text-red text-md'>Invalid email</p>
          }
          {
            errors.password && <p className='text-red text-md'>Password must be atleast 8 characters</p>
          }
        </div>
        <div>
          <Link to={"/signin"} className={"cursor-pointer text-primary text-sm float-right"}>
            don't have an account?
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login