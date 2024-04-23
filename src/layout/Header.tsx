import { Link } from 'react-router-dom'
import Cart from '../components/cart/Cart'

const Header = () => {
  return (
    <div className="flex justify-between border p-6">
      <Link to="/">Header</Link>
      <div className='flex gap-5'>
        <Link to="/new">New</Link>
        <Cart />
      </div>
    </div>
  )
}

export default Header
