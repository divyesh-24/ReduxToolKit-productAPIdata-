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
import { getAllProductsAsync } from '../features/product/productSlice'
import {
  Badge,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material'
import { BiLogOut } from 'react-icons/bi'
import { CgProfile, CgUserList } from 'react-icons/cg'
import { IoMdMenu } from 'react-icons/io'
import {
  MdOutlineFeaturedPlayList,
  MdOutlineFeed,
  MdOutlineMapsUgc,
} from 'react-icons/md'

interface MenuButtonProps {
  menuId: string
  menuItems: { title: string; icon: JSX.Element; path: string }[]
  menuName: string
}

const Header = () => {
  const navigate = useNavigate()

  const cartTotalItem = useAppSelector(
    (state) => state.carts.cartProducts?.length,
  )
  const user = useAppSelector((s) => s.auth.user)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllProductsAsync())
    if (user.id) {
      dispatch(getCartProductsByUserAsync(user.id as string))
    } else {
      dispatch(CheckCartProductAsync())
    }
  }, [user.id, dispatch])

  useEffect(() => {}, [dispatch, user])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <header className="bg-white/20">
        <div className="  px-4 py-5 mx-auto sm:max-w-full md:max-w-full lg:max-w-full md:px-20 lg:px-8">
          <div className="relative flex items-center justify-between">
            <Link
              to="/"
              aria-label="Company"
              title="Company"
              className="inline-flex items-center"
            >
              <>
                <svg
                  className="w-8 text-indigo-500"
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
              </>
            </Link>
            <ul className=" items-center hidden space-x-8 lg:flex">
              <li>
                <Button
                  color="inherit"
                  sx={{
                    fontFamily: 'inherit',
                    fontWeight: '500',
                    letterSpacing: 'widest',
                    color: '#374151', // Hex value for gray-700 in Tailwind CSS
                    transition: 'color 200ms',
                    '&:hover': {
                      color: '#818cf8', // Hex value for indigo-400 in Tailwind CSS
                    },
                  }}
                >
                  <Link
                    to="/"
                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                  >
                    Home
                  </Link>
                </Button>
              </li>

              {Object.keys(user).includes('id') && (
                <li>
                  {/* <Link
                    to="/feedback"
                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                  >
                    Feedback
                  </Link> */}
                  <MenuButton
                    menuName="Feedback"
                    menuId="menu2"
                    menuItems={[
                      {
                        title: 'Add FeedBack',
                        icon: <MdOutlineMapsUgc className="h-5 w-5 mr-2" />,
                        path: '/feedback',
                      },
                      {
                        title: 'My FeedBacks',
                        icon: <MdOutlineFeed className="h-5 w-5 mr-2" />,
                        path: '/feedbackDetails',
                      },
                    ]}
                  />
                </li>
              )}
              {/* {Object.keys(user).includes('id') && (
                <li>
                  <Link
                    to="/feedbackDetails"
                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                  >
                    Feedback Details
                  </Link>
                </li>
              )} */}
              {user.isAdmin && (
                <>
                  <MenuButton
                    menuName="Admin"
                    menuId="menu2"
                    menuItems={[
                      {
                        title: 'All Products',
                        icon: (
                          <MdOutlineFeaturedPlayList className="h-5 w-5 mr-2" />
                        ),
                        path: '/admin/products',
                      },
                      {
                        title: 'All Users',
                        icon: <CgUserList className="h-5 w-5 mr-2" />,
                        path: '/admin/users',
                      },
                      {
                        title: 'All FeedBacks',
                        icon: <MdOutlineFeed className="h-5 w-5 mr-2" />,
                        path: '/admin/feedbacks',
                      },
                    ]}
                  />
                  <li>
                    <Button
                      color="inherit"
                      sx={{
                        fontFamily: 'inherit',
                        fontWeight: '500',
                        letterSpacing: 'widest',
                        color: '#374151', // Hex value for gray-700 in Tailwind CSS
                        transition: 'color 200ms',
                        '&:hover': {
                          color: '#818cf8', // Hex value for indigo-400 in Tailwind CSS
                        },
                      }}
                    >
                      <Link
                        to="/admin/feedbackForm"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                      >
                        Edit FeedBack
                      </Link>
                    </Button>
                  </li>
                  {/* <li>
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
                  </li> */}
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
              <IconButton>
                <Link
                  to="/cart"
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400 relative"
                >
                  {cartTotalItem > 0 ? (
                    <>
                      <Badge
                        badgeContent={cartTotalItem > 0 && cartTotalItem}
                        color="primary"
                      >
                        <BsCart4 className="h-8 w-8" />
                      </Badge>
                    </>
                  ) : (
                    <BsCart4 className="h-8 w-8" />
                  )}
                </Link>
              </IconButton>
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
                  <IconButton
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <div
                      // to="/profile"
                      className="inline-flex items-center text-white justify-center h-12 w-12  font-medium tracking-wide  transition duration-200 rounded-full  shadow-md bg-indigo-200 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                    >
                      <img
                        src={`${`${user.profile}` ?? 'https://source.unsplash.com/random/300x300'}`}
                        alt="Profile"
                        className="h-full w-full  rounded-full  border border-indigo-700 p-0.5"
                      />
                    </div>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <Link to="/profile">
                      <MenuItem onClick={handleClose}>
                        <CgProfile className="w-5 h-5 mr-4" />
                        Profile
                      </MenuItem>
                    </Link>
                    {/* <MenuItem onClick={handleClose}>
                      <Avatar /> My account
                    </MenuItem> */}
                    <Divider />
                    <div
                      onClick={() => {
                        dispatch(logoutUserAsync())
                        dispatch(ClearCartProductLocalAsync())
                        navigate('/')
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <BiLogOut className="w-5 h-5 mr-4" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </div>
                  </Menu>
                  {/* <li>
                    <Button
                      variant="contained"
                      sx={{ paddingX: '24px' }}
                      className="inline-flex items-center text-white justify-center h-12 px-6 font-medium tracking-wide  transition duration-200 rounded shadow-md bg-indigo-400 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                      onClick={() => {
                        dispatch(logoutUserAsync())
                        dispatch(ClearCartProductLocalAsync())
                        navigate('/')
                      }}
                    >
                      Logout
                    </Button>
                  </li> */}
                </>
              )}
            </ul>

            <div className="lg:hidden">
              <div className="flex gap-3">
                <IconButton>
                  <Link
                    to="/cart"
                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400 relative"
                  >
                    {cartTotalItem > 0 ? (
                      <>
                        <Badge
                          badgeContent={cartTotalItem > 0 && cartTotalItem}
                          color="primary"
                        >
                          <BsCart4 className="h-8 w-8" />
                        </Badge>
                      </>
                    ) : (
                      <BsCart4 className="h-8 w-8" />
                    )}
                  </Link>
                </IconButton>
                <IconButton
                  sx={{ paddingX: '8px' }}
                  aria-label="Open Menu"
                  title="Open Menu"
                  className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <IoMdMenu className="h-8 w-8" />
                </IconButton>
              </div>
              {/* bg-gradient-to-bl from-indigo-300 to-indigo-200 */}
              {isMenuOpen && (
                <div className="absolute top-0 left-0 w-full z-30 ">
                  <div className="p-5 bg-gradient-to-bl from-indigo-300 to-indigo-200 text-black border border-black/20 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Link to="/" className="inline-flex items-center">
                          <svg
                            className="w-8 text-indigo-500"
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
                        <IconButton
                          aria-label="Close Menu"
                          title="Close Menu"
                          className="p-2 -mt-2  -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg
                            className="w-5 text-gray-700"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                            />
                          </svg>
                        </IconButton>
                      </div>
                    </div>

                    <nav>
                      <ul className="space-y-4">
                        <hr />
                        <li>
                          <Button
                            variant="outlined"
                            sx={{
                              minWidth: '100%',
                              '@media (min-width: 600px)': {
                                minWidth: '50%', // 1/2 width on medium screens and above
                              },
                            }}
                          >
                            <Link
                              to="/"
                              aria-label="Our product"
                              title="Our product"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Home
                            </Link>
                          </Button>
                        </li>
                        {Object.keys(user).includes('id') && (
                          <>
                            <li>
                              <Button
                                variant="outlined"
                                sx={{
                                  minWidth: '100%',
                                  '@media (min-width: 600px)': {
                                    minWidth: '50%', // 1/2 width on medium screens and above
                                  },
                                }}
                              >
                                <Link
                                  to="/feedback"
                                  aria-label="Our product"
                                  title="Our product"
                                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  FeedBack
                                </Link>
                              </Button>
                            </li>
                            <li>
                              <Button
                                variant="outlined"
                                sx={{
                                  minWidth: '100%',
                                  '@media (min-width: 600px)': {
                                    minWidth: '50%', // 1/2 width on medium screens and above
                                  },
                                }}
                              >
                                <Link
                                  to="/feedbackDetails"
                                  aria-label="Our product"
                                  title="Our product"
                                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  My FeedBacks
                                </Link>
                              </Button>
                            </li>
                          </>
                        )}
                        <hr />
                        {user.isAdmin && (
                          <li>
                            <Button
                              variant="outlined"
                              sx={{
                                minWidth: '100%',
                                '@media (min-width: 600px)': {
                                  minWidth: '50%', // 1/2 width on medium screens and above
                                },
                              }}
                            >
                              <Link
                                to="/admin/feedbackForm"
                                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                              >
                                Edit FeedBack
                              </Link>
                            </Button>
                          </li>
                        )}
                        <hr />
                        {user.isAdmin && (
                          <li>
                            <Button
                              variant="outlined"
                              sx={{
                                minWidth: '100%',
                                '@media (min-width: 600px)': {
                                  minWidth: '50%', // 1/2 width on medium screens and above
                                },
                              }}
                            >
                              <Link
                                to="admin/products"
                                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                All Products
                              </Link>
                            </Button>
                          </li>
                        )}
                        {user.isAdmin && (
                          <li>
                            <Button
                              variant="outlined"
                              sx={{
                                minWidth: '100%',
                                '@media (min-width: 600px)': {
                                  minWidth: '50%', // 1/2 width on medium screens and above
                                },
                              }}
                            >
                              <Link
                                to="admin/users"
                                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                All Users
                              </Link>
                            </Button>
                          </li>
                        )}
                        {user.isAdmin && (
                          <li>
                            <Button
                              variant="outlined"
                              sx={{
                                minWidth: '100%',
                                '@media (min-width: 600px)': {
                                  minWidth: '50%', // 1/2 width on medium screens and above
                                },
                              }}
                            >
                              <Link
                                to="admin/feedbacks"
                                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-indigo-400"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                All Feedbacks
                              </Link>
                            </Button>
                          </li>
                        )}
                        <hr />
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
                              <Button
                                variant="contained"
                                sx={{ paddingY: '12px', paddingX: '20px' }}
                                className="inline-flex items-center text-white justify-center h-12 w-full  font-medium tracking-wide  transition duration-200 rounded  shadow-md bg-indigo-400 hover:bg-indigo-200 focus:shadow-outline focus:outline-none"
                                onClick={() => {
                                  setIsMenuOpen(false)
                                  dispatch(logoutUserAsync())
                                  dispatch(ClearCartProductLocalAsync())
                                  navigate('/')
                                }}
                              >
                                Logout
                              </Button>
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
    </>
  )
}

const MenuButton: React.FC<MenuButtonProps> = ({
  menuName,
  menuId,
  menuItems,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        color="inherit"
        sx={{
          fontFamily: 'inherit',
          fontWeight: '500',
          letterSpacing: 'widest',
          color: '#374151', // Hex value for gray-700 in Tailwind CSS
          transition: 'color 200ms',
          '&:hover': {
            color: '#818cf8', // Hex value for indigo-400 in Tailwind CSS
          },
        }}
        aria-label={menuId}
        onClick={handleMenuOpen}
      >
        {menuName}
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <MenuItem onClick={handleMenuClose}>
              {item.icon} {item.title}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </>
  )
}

export default Header
