import { useCallback, useEffect } from 'react'
import ProtectedRoute from '../Admin/components/ProtectedRoute'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { deleteUserAsync, getAllUsersAsync } from '../features/auth/authSlice'
import TableComponent from '../components/TableComponent'

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
      dispatch(deleteUserAsync(id))
    },
    [dispatch],
  )
  useEffect(() => {}, [dispatch, users])

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
