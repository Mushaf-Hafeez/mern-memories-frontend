import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

    const token = useSelector(state => state.auth.token)
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/unauthorized')
        }
    }, [token, navigate])

    if (!token) {
        return null
    } else {
        return <div>{children}</div>
    }
}

export default ProtectedRoute