import { Link } from 'react-router-dom'
import CartList from '../features/cart/components/CartList'

const Header = () => {
  return (
    <div className="flex justify-between border p-6">
      <Link to="/">Header</Link>
      <div className='flex gap-5'>
        <Link to="/new">New</Link>
        <CartList />
      </div>
    </div>
  )
}

export default Header
