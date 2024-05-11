import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import { Provider } from 'react-redux'
import { store } from './Store'
import ProductsList from '../features/product/components/ProductsList'
import CartList from '../features/cart/components/CartList'
import Error from '../components/Error'
import AuthForm from '../features/auth/components/AuthForm'
import AddProductPage from '../pages/AddProductPage'
import UserProfilePage from '../pages/UserProfilePage'
import DynamicForm from '../features/Feedback/components/DynamicForm'
import FeedBackFormPage from '../pages/FeedBackFormPage'
import AllFeedbackPage from '../pages/AllFeedbackPage'
import AllProductsPageMUI from '../pages/AllProductsPageMUI'
import AllUsersPageMUI from '../pages/AllUsersPageMUI'

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
        path: '/feedback',
        element: <DynamicForm />,
      },
      {
        path: '/admin/products',
        element: <AllProductsPageMUI />,
      },
      {
        path: '/admin/feedbackForm',
        element: <FeedBackFormPage />,
      },
      {
        path: '/admin/users',
        element: <AllUsersPageMUI />,
      },
      {
        path: '/profile',
        element: <UserProfilePage />,
      },
      {
        path: '/feedbackDetails',
        element: <AllFeedbackPage />,
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
