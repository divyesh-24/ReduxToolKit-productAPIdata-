import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getFeedbackFormAsync } from '../features/Feedback form/feedBackFormSlice'

const withProtectedRoute = (WrappedComponent: () => JSX.Element) => {
  const ProtectedRoute = () => {
    const user = useAppSelector((s) => s.auth.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(getFeedbackFormAsync())
    }, [dispatch])

    useEffect(() => {}, [user])

    if (!user.isAdmin) {
      return <Navigate to="/" replace={true} />
    }

    return <WrappedComponent />
  }

  return ProtectedRoute
}

export default withProtectedRoute
