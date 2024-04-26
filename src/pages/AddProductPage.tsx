import ProtectedRoute from '../Admin/components/ProtectedRoute'
import AddProduct from '../features/product/components/AddProduct'

const AddProductPage = () => {
  return (
    <>
      <ProtectedRoute>
        <AddProduct />
      </ProtectedRoute>
    </>
  )
}

export default AddProductPage
