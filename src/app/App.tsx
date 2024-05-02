import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import { Provider } from 'react-redux'
import { store } from './Store'
import ProductsList from '../features/product/components/ProductsList'
import CartList from '../features/cart/components/CartList'
import Error from '../components/Error'
import AuthForm from '../features/auth/components/AuthForm'
import AddProductPage from '../pages/AddProductPage'
import AllProductsPage from '../pages/AllProductsPage'
import UserProfilePage from '../pages/UserProfilePage'
import AllUsersPage from '../pages/AllUsersPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ProductsList />,
      },
      {
        path: '/new',
        element: <AddProductPage />,
      },
      {
        path: '/edit/:id',
        element: <AddProductPage />,
      },
      {
        path: '/cart',
        element: <CartList />,
      },
      {
        path: '/admin/products',
        element: <AllProductsPage />,
      },
      {
        path: '/admin/users',
        element: <AllUsersPage />,
      },
      {
        path: '/profile',
        element: <UserProfilePage />,
      },

      {
        path: '/login',
        element: <AuthForm />,
      },
      {
        path: '/register',
        element: <AuthForm />,
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
])

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
