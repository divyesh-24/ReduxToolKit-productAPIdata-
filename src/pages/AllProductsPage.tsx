import ProtectedRoute from '../Admin/components/ProtectedRoute'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import TableComponent from '../features/product/components/TableComponent'
import {
  deleteProductAsync,
  getAllProductsAsync,
} from '../features/product/productSlice'

const AllProductsPage = () => {
  const dispatch = useAppDispatch()

  const products = useAppSelector((s) => s.products.products)
  const totalItems = useAppSelector((s) => s.products.totalItems)
  const totalPages = useAppSelector((s) => s.products.totalPages)
  const getAllData = (page: number) => {
    dispatch(getAllProductsAsync(page))
  }

  const deleteFunction = (id: string) => {
    dispatch(deleteProductAsync(id))
  }
  return (
    <ProtectedRoute>
      <TableComponent
        products={products}
        totalItems={totalItems}
        totalPages={totalPages}
        deleteFunction={deleteFunction}
        getAllData={getAllData}
      />
    </ProtectedRoute>
  )
}

export default AllProductsPage
