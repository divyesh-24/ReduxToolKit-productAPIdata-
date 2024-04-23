import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import { Provider } from 'react-redux'
import { store } from './Store'
import ProductsList from '../features/product/components/ProductsList'
import AddProduct from '../features/product/components/AddProduct'

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
        element: <AddProduct />,
      },
      {
        path: '/edit/:id',
        element: <AddProduct />,
      },
    ],
  },
])

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
        {/* mongodb+srv://divyeshS24:JrReactData@clusters.abyimsh.mongodb.net/?retryWrites=true&w=majority&appName=ClusterS */}
      </Provider>
    </>
  )
}

export default App
