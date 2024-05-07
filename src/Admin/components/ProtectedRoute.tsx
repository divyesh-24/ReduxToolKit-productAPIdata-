import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Navigate } from 'react-router-dom'
import { getFeedbackFormAsync } from '../../features/Feedback form/feedBackFormSlice'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useAppSelector((s) => s.auth.user)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getFeedbackFormAsync())
  }, [dispatch])

  useEffect(() => {}, [user])
  if (!user.isAdmin) {
    return <Navigate to="/" replace={true} />
  }
  return <>{children}</>
}

export default ProtectedRoute
