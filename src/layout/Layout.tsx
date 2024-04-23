import { Outlet } from 'react-router-dom'
import Header from './Header'

// }
const Layout = () => {
  return (
    <div className="h-full w-full">
      <div className="max-w-7xl mx-auto h-screen ">
        <Header />
        <div className="my-[4rem] min-h-[calc(100vh-8rem)] border">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
