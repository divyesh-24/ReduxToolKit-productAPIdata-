import ProtectedRoute from '../Admin/components/ProtectedRoute'
import UserProfile from '../features/user/components/UserProfile'

const UserProfilePage = () => {
  return (
    <>
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    </>
  )
}

export default UserProfilePage
