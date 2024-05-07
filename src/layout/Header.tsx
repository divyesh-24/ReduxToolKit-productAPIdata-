import { BsCart4 } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logoutUserAsync } from '../features/auth/authSlice'
import { useEffect, useState } from 'react'
import {
  CheckCartProductAsync,
  ClearCartProductLocalAsync,
  getCartProductsByUserAsync,
} from '../features/cart/cartSlice'

const Header = () => {
  const navigate = useNavigate()

  const cartTotalItem = useAppSelector(
    (state) => state.carts.cartProducts?.length,
  )
  const user = useAppSelector((s) => s.auth.user)

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (user.id) {
      dispatch(getCartProductsByUserAsync(user.id as string))
    } else {
      dispatch(CheckCartProductAsync())
    }
  }, [user.id, dispatch])

  useEffect(() => {}, [dispatch, user])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <>
      <header className="bg-white">
        <div className="px-4 py-5 mx-auto sm:max-w-full md:max-w-full lg:max-w-full md:px-20 lg:px-8">
          <div className="relative flex items-center justify-between">
            <Link
              to="/"
              aria-label="Company"
              title="Company"
              className="inline-flex items-center"
            >
              <svg
                className="w-8 text-indigo-400"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                fill="none"
              >
                <rect x="3" y="1" width="7" height="12" />
                <rect x="3" y="17" width="7" height="6" />
                <rect x="14" y="1" width="7" height="6" />
                <rect x="14" y="11" width="7" height="12" />
              </svg>
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                Company
              </span>
            </Link>
            <ul className=" items-center hidden space-x-8 lg:flex">
              <li>
                <Link
                  to="/"
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/feedbackDetails"
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                >
                  Feedback Details
                </Link>
              </li>
              {Object.keys(user).includes('id') && (
                <li>
                  <Link
                    to="/feedback"
                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                  >
                    Feedback
                  </Link>
                </li>
              )}

              {user.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/feedbackForm"
                      className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                    >
                      Edit FeedBack
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/products"
                      className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                    >
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/users"
                      className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                    >
                      All Users
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to="/new"
                      className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                    >
                      New Product
                    </Link>
                  </li> */}
                </>
              )}
              <li>
                <Link
                  to="/cart"
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400 relative"
                >
                  {cartTotalItem > 0 && (
                    <span className="absolute  -top-1 -right-1 text-xs bg-white w-4 h-4 rounded-full border border-black text-center ">
                      <p>{cartTotalItem}</p>
                    </span>
                  )}
                  <BsCart4 className="h-8 w-8" />
                </Link>
              </li>
              {Object.keys(user)?.length == 0 ? (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="inline-flex items-center text-white justify-center h-12 px-6 font-medium tracking-wide  transition duration-200 rounded shadow-md bg-indigo-400 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                      aria-label="Sign up"
                      title="Sign up"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="inline-flex items-center text-white justify-center h-12 px-6 font-medium tracking-wide  transition duration-200 rounded shadow-md bg-indigo-400 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                      aria-label="Sign up"
                      title="Sign up"
                    >
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="inline-flex items-center text-white justify-center h-12 w-12  font-medium tracking-wide  transition duration-200 rounded-full  shadow-md bg-indigo-200 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                    >
                      <img
                        src={`${`${user.profile}` ?? 'https://source.unsplash.com/random/300x300'}`}
                        alt="Profile"
                        className="h-full w-full  rounded-full mx-auto border border-indigo-700 p-0.5"
                      />
                    </Link>
                  </li>
                  <li>
                    <button
                      className="inline-flex items-center text-white justify-center h-12 px-6 font-medium tracking-wide  transition duration-200 rounded shadow-md bg-indigo-400 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                      onClick={() => {
                        dispatch(logoutUserAsync())
                        dispatch(ClearCartProductLocalAsync())
                        navigate('/')
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>

            <div className="lg:hidden">
              <div className="flex gap-3">
                <Link
                  to="/cart"
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400 relative"
                >
                  {cartTotalItem > 0 && (
                    <span className="absolute -top-1 -right-1 text-xs bg-white w-4 h-4 rounded-full border border-black text-center ">
                      {cartTotalItem}
                    </span>
                  )}
                  <BsCart4 className="h-8 w-8" />
                </Link>
                <button
                  aria-label="Open Menu"
                  title="Open Menu"
                  className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                    />
                    <path
                      fill="currentColor"
                      d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                    />
                    <path
                      fill="currentColor"
                      d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                    />
                  </svg>
                </button>
              </div>

              {isMenuOpen && (
                <div className="absolute top-0 left-0 w-full z-30">
                  <div className="p-5 bg-white text-black border rounded shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Link to="/" className="inline-flex items-center">
                          <svg
                            className="w-8 text-indigo-400"
                            viewBox="0 0 24 24"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            stroke="currentColor"
                            fill="none"
                          >
                            <rect x="3" y="1" width="7" height="12" />
                            <rect x="3" y="17" width="7" height="6" />
                            <rect x="14" y="1" width="7" height="6" />
                            <rect x="14" y="11" width="7" height="12" />
                          </svg>
                          <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            Company
                          </span>
                        </Link>
                      </div>
                      <div>
                        <button
                          aria-label="Close Menu"
                          title="Close Menu"
                          className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg
                            className="w-5 text-gray-600"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <nav>
                      <ul className="space-y-4">
                        <li>
                          <Link
                            to="/"
                            aria-label="Our product"
                            title="Our product"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Home
                          </Link>
                        </li>
                        {Object.keys(user).includes('id') && (
                          <li>
                            <Link
                              to="/feedback"
                              aria-label="Our product"
                              title="Our product"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              FeedBack
                            </Link>
                          </li>
                        )}
                        {user.isAdmin && (
                          <li>
                            <Link
                              to="/admin/feedbackForm"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                            >
                              Edit FeedBack
                            </Link>
                          </li>
                        )}
                        {user.isAdmin && (
                          <li>
                            <Link
                              to="admin/products"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              All Products
                            </Link>
                          </li>
                        )}
                        {user.isAdmin && (
                          <li>
                            <Link
                              to="admin/users"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              All Users
                            </Link>
                          </li>
                        )}

                        {Object.keys(user)?.length == 0 ? (
                          <>
                            <li>
                              <Link
                                to="/register"
                                className="inline-flex text-white items-center justify-center w-full h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-md bg-indigo-400 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                                aria-label="Register"
                                title="Register"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                Register
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/login"
                                className="inline-flex items-center text-white justify-center w-full h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-md bg-indigo-400 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                                aria-label="Login"
                                title="Login"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                Login
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between items-center gap-5 pr-4">
                              <li>
                                <Link
                                  to="/profile"
                                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  My Profile
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/profile"
                                  className="inline-flex text-white items-center justify-center h-12 w-12  font-medium tracking-wide  transition duration-200 rounded-full  shadow-md bg-indigo-400 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <img
                                    src={`${`${user?.profile}` ?? 'https://source.unsplash.com/random/300x300'}`}
                                    alt="Profile"
                                    className="h-full w-full  rounded-full mx-auto border border-indigo-700 p-0.5"
                                  />
                                </Link>
                              </li>
                            </div>
                            <li>
                              <button
                                className="inline-flex items-center text-white justify-center h-12 w-full  font-medium tracking-wide  transition duration-200 rounded  shadow-md bg-indigo-400 hover:bg-indigo-200 focus:shadow-outline focus:outline-none"
                                onClick={() => {
                                  setIsMenuOpen(false)
                                  dispatch(logoutUserAsync())
                                  dispatch(ClearCartProductLocalAsync())
                                  navigate('/')
                                }}
                              >
                                Logout
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* <div className="flex justify-between items-center border p-6">
        <Link to="/">DE-CART</Link>
        <div className="flex gap-5 items-center">
          {user.isAdmin && (
            <Link to="/new" className="border px-3 py-2 rounded-lg">
              New Product
            </Link>
          )}
          <Link
            to="/cart"
            className="relative border hover:border-solid px-2 py-2 rounded-full hover:border-black"
          >
            {cartTotalItem > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-white w-4 h-4 rounded-full border border-black text-center ">
                {cartTotalItem}
              </span>
            )}
            <BsCart4 className="h-8 w-8 " />
          </Link>
          {Object.keys(user).length == 0 ? (
            <>
              <Link to="/login" className="border px-3 py-2 rounded-lg">
                Login
              </Link>
              <Link to="/register" className="border px-3 py-2 rounded-lg">
                Register
              </Link>
            </>
          ) : (
            <button
              className="border px-3 py-2 rounded-lg"
              onClick={() => dispatch(logoutUserAsync())}
            >
              Logout
            </button>
          )}
        </div>
      </div> */}
    </>
  )
}

export default Header
