import ProtectedRoute from '../Admin/components/ProtectedRoute'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getAllUsersAsync } from '../features/auth/authSlice'
import TableComponent from '../features/product/components/TableComponent'

const AllUsersPage = () => {
  const dispatch = useAppDispatch()

  const users = useAppSelector((s) => s.auth.users)
  const totalItems = useAppSelector((s) => s.products.totalItems)
  const totalPages = useAppSelector((s) => s.products.totalPages)
  const getAllData = (page: number) => {
    dispatch(getAllUsersAsync(page))
  }

  const deleteFunction = (id: string) => {
    console.log(id)
    // dispatch(deleteProductAs(id))
  }
  return (
    <ProtectedRoute>
      <TableComponent
        products={users}
        totalItems={totalItems}
        totalPages={totalPages}
        deleteFunction={deleteFunction}
        getAllData={getAllData}
      />
    </ProtectedRoute>
  )
}

export default AllUsersPage
