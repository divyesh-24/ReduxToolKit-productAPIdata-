import React, { useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useAppSelector((s) => s.auth.user)

  useEffect(() => {}, [user])
  if (!user.isAdmin) {
    return <Navigate to="/" replace={true} />
  }
  return <>{children}</>
}

export default ProtectedRoute
