import ProtectedRoute from '../Admin/components/ProtectedRoute'
import FormBuilder from '../features/Feedback form/components/FormBuilder'

const FeedBackFormPage = () => {
  return (
    <>
      <ProtectedRoute>
        <FormBuilder />
      </ProtectedRoute>
    </>
  )
}

export default FeedBackFormPage
