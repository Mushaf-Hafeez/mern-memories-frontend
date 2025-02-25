import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearToken, clearName, clearId } from '../redux/slices/Auth';
import { IoReorderThree, IoClose, IoExitOutline, IoAdd } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false)
  const { token, name } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsOpen(false)
    const loadingToastId = toast.loading('Loading...')
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('id')
    dispatch(clearToken())
    dispatch(clearName())
    dispatch(clearId())
    toast.success('Logout successful.', { id: loadingToastId })
    navigate('/')
  }

  const gotoDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <header className='px-10 md:px-20 lg:px-40 py-5 flex flex-col font-poppins'>

      {/* div that contains the logo and the navlinks for larger devices */}
      <div className='w-full h-full flex items-center justify-between'>

        {/* logo */}
        <Link to={"/"}>
          <img src="logo.png" alt="logo error" className='h-20' />
        </Link>

        {/* navlinks for larger devices if user is logged in, it has diffent div to display */}
        <nav className='hidden md:flex items-center gap-2'>
          {
            token ? (
              <div className='flex items-center gap-2'>
                <span onClick={gotoDashboard} className='h-10 w-10 text-center pt-1.5 text-lg bg-primary text-Background rounded-full cursor-pointer'>
                  {
                    name.slice(0, 2)
                  }
                </span>
                <Link to={"/create"} className='px-3 py-2 rounded flex items-center gap-2 bg-primary text-Background cursor-pointer active:bg-primary/60'>
                  Create Post
                  <IoAdd size={20}/>
                </Link>
                <button onClick={handleLogout} className='px-3 py-2 rounded flex items-center gap-2 bg-primary text-Background cursor-pointer active:bg-primary/60'>
                  Logout
                  <IoExitOutline size={20} />
                </button>
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <Link to={"login"} className='px-3 py-2 rounded bg-primary text-Background cursor-pointer active:bg-primary/60'>
                  Log in
                </Link>
                <Link to={"signin"} className='px-3 py-2 rounded bg-primary text-Background cursor-pointer active:bg-primary/60'>
                  Sign in
                </Link>
              </div>
            )
          }
        </nav>

        {/* nav icon for mobile devices */}
        {
          isOpen ? (
            <div className='md:hidden flex items-center gap-2'>
              {
                name && <span onClick={gotoDashboard} className='h-10 w-10 text-center pt-1.5 text-lg bg-primary text-Background rounded-full cursor-pointer'>
                  {
                    name.slice(0, 2)
                  }
                </span>
              }
              <IoClose onClick={() => setIsOpen(prev => !prev)} color='white' size={30} />
            </div>
          ) : (
            <div className='md:hidden flex items-center gap-2'>
              {
                name && <span onClick={gotoDashboard} className='h-10 w-10 text-center pt-1.5 text-lg bg-primary text-Background rounded-full cursor-pointer'>
                  {
                    name.slice(0, 2)
                  }
                </span>
              }
              <IoReorderThree onClick={() => setIsOpen(prev => !prev)} color='white' size={30} />
            </div>
          )
        }
      </div >

      {/* navlinks for mobile devices */}
      {
        isOpen && <nav className='flex items-center justify-center gap-2 md:hidden transition-all ease-in-out duration-200'>
          {
            token ? (
              <div className='flex flex-col items-end gap-2 w-full'>
                <Link onClick={() => setIsOpen(false)} to={"/create"} className='px-3 py-2 rounded border-b-1 border-secondary text-primary border-b-primary cursor-pointer'>
                  Create Post
                </Link>
                <button onClick={handleLogout} className='px-3 py-2 rounded border-b-1 border-secondary text-primary border-b-primary cursor-pointer'>
                  Logout
                </button>
              </div>
            ) : (
              <div className='flex flex-col items-end gap-2 w-full'>
                <Link onClick={() => setIsOpen(false)} to={"login"} className='px-3 py-2 rounded border-b-1 border-secondary text-primary border-b-primary cursor-pointer'>
                  Log in
                </Link>
                <Link onClick={() => setIsOpen(false)} to={"signin"} className='px-3 py-2 rounded border-b-1 border-secondary text-primary border-b-primary cursor-pointer'>
                  Sign in
                </Link>
              </div>
            )
          }
        </nav>
      }
    </header >
  )
}

export default Navbar