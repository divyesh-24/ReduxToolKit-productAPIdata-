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
import { ThemeProvider, createTheme } from '@mui/material'

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

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#6366f1', // custom primary color
    },
  },
  typography: {
    fontFamily: 'Raleway, Arial',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    // Add more typography styles as needed
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
})

function App() {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default App
