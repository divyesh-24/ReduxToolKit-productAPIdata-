import { BsCart4 } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

const Header = () => {
  const cartTotalItem = useAppSelector(
    (state) => state.carts.cartProducts.length,
  )
  return (
    <div className="flex justify-between border p-6">
      <Link to="/">DE-CART</Link>
      <div className="flex gap-5">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/new">New</Link>
        <Link to="/cart" className="relative">
          {cartTotalItem > 0 && (
            <span className="absolute -top-1 -right-1 text-xs bg-white w-4 h-4 rounded-full border border-black text-center ">
              {cartTotalItem}
            </span>
          )}
          <BsCart4 className="h-8 w-8" />
        </Link>
      </div>
    </div>
  )
}

export default Header
