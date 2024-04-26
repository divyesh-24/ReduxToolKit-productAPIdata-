import ProtectedRoute from '../Admin/components/ProtectedRoute'
import TableComponent from '../features/product/components/TableComponent'

const AllProductsPage = () => {
  return (
    <ProtectedRoute>
      <TableComponent />
    </ProtectedRoute>
  )
}

export default AllProductsPage
