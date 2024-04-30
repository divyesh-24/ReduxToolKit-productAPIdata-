import { useCallback } from 'react'
import ProtectedRoute from '../Admin/components/ProtectedRoute'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getAllUsersAsync } from '../features/auth/authSlice'
import TableComponent from '../features/product/components/TableComponent'

const AllUsersPage = () => {
  const dispatch = useAppDispatch()

  const users = useAppSelector((s) => s.auth.users)
  const totalItems = useAppSelector((s) => s.auth.totalItems)
  const totalPages = useAppSelector((s) => s.auth.totalPages)
  const getAllData = useCallback(
    (page: number) => {
      dispatch(getAllUsersAsync(page))
    },
    [dispatch],
  )

  const deleteFunction = useCallback(
    (id: string) => {
      console.log(id)
      // dispatch(deleteProductAs(id))
    },
    [dispatch],
  )
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
