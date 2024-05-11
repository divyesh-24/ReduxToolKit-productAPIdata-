import React, { useCallback } from 'react'
import ProtectedRoute from '../Admin/components/ProtectedRoute'
import { useAppDispatch, useAppSelector } from '../app/hooks'

import {
  AccessorKeyColumnDef,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table'
import { Product } from '../features/product/productApi'
import { UserType } from '../features/auth/authApi'
import AllProducts from '../features/product/components/AllProducts'
import { getAllUsersAsync } from '../features/user/userSlice'

const AllUsersPageMUI = () => {
  const dispatch = useAppDispatch()

  const products = useAppSelector((s) => s.user.users)

  const columnHelper = createColumnHelper<Product | UserType>()
  console.log(products)

  // id?: string | undefined;
  //   name: string;
  //   email: string;
  //   password: string;
  //   coverColor: string;
  //   isAdmin: boolean;
  //   profile: string;
  //   mobileNo: string;
  //   profession: string;
  const columns = React.useMemo<
    | ColumnDef<Product | UserType, unknown>[]
    | AccessorKeyColumnDef<Product | UserType, string>[]
  >(
    () => [
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
      }),
      {
        header: 'name',
        accessorKey: 'name',
        cell: ({ getValue }: { getValue: () => string }) => (
          <div className="px-6 py-4 text-center capitalize">{getValue()}</div>
        ),
      },
      {
        header: 'profile',
        accessorKey: 'profile',
        cell: ({ getValue }: { getValue: () => string }) => (
          <img
            src={getValue()}
            alt=""
            className="inline-flex items-center min-w-10 text-white justify-center h-10 w-10  font-medium tracking-wide  transition duration-200 rounded-full  shadow-md bg-indigo-200 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
          />
        ),
      },
      {
        header: 'email',
        accessorKey: 'email',
      },
      {
        header: 'mobileNo',
        accessorKey: 'mobileNo',
      },
      {
        header: 'profession',
        accessorKey: 'profession',
        cell: ({ getValue }: { getValue: () => string }) => (
          <div className="px-6 py-4 text-center capitalize">{getValue()}</div>
        ),
      },

      {
        header: 'coverColor',
        accessorKey: 'coverColor',
        cell: ({ getValue }: { getValue: () => string }) => (
          <div
            className="px-2 py-1 text-white inline-block rounded-full border border-indigo-600"
            style={{ backgroundColor: getValue() }}
          >
            {getValue()}
          </div>
        ),
      },
      {
        header: 'isAdmin',
        accessorKey: 'isAdmin',
        cell: ({ getValue }: { getValue: () => string }) => (
          <div className="px-6 py-4 text-center">
            {getValue() ? 'Yes' : 'No'}
          </div>
        ),
      },
    ],
    [columnHelper],
  )

  const deleteFunction = useCallback((id: string) => {
    // dispatch(deleteProductAsync(id))
    console.log(id)
  }, [])
  const data = React.useMemo(() => [...products], [products])
  const getAllData = useCallback(() => {
    dispatch(getAllUsersAsync())
  }, [dispatch])

  return (
    <ProtectedRoute>
      <AllProducts
        data={data}
        deleteFunction={deleteFunction}
        columns={columns}
        getAllData={getAllData}
      />
    </ProtectedRoute>
  )
}

export default AllUsersPageMUI
