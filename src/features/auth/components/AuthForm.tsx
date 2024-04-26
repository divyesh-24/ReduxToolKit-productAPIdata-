// type Props = {}

import { Link, Navigate, useLocation } from 'react-router-dom'
import ImageUploader from '../../../components/ImageUploader'
import { FormEventHandler, useEffect, useState } from 'react'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
//@ts-expect-error hash password from backend
import bcrypt from 'bcryptjs'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { createUserAsync, getUserByEmailAsync } from '../authSlice'
interface newUserType {
  name: string
  email: string
  password: string
  coverColor: string
  isAdmin: boolean
  profile: string
}
export interface LogInData {
  email: string
  password: string
}

const AuthForm: React.FC = () => {
  const path = useLocation()
  const [imageFile, setImageFile] = useState<string>('')
  const [showPass, setShowPass] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [mail, setMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [bgcolor, setBgcolor] = useState<string>('#555')
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const user = useAppSelector((s) => s.auth.user)
  const errorData = useAppSelector((s) => s.auth.error)
  // const navigate = useNavigate()
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (path.pathname == '/register') {
      const newUser: newUserType = {
        name,
        email: mail,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(11)),
        coverColor: bgcolor,
        isAdmin,
        profile: imageFile,
      }
      dispatch(createUserAsync(newUser))
    }
    if (path.pathname == '/login') {
      const newUserData: LogInData = {
        email: mail,
        password,
      }
      dispatch(getUserByEmailAsync(newUserData))
      // navigate('/')
    }
  }
  useEffect(() => {}, [errorData, path])
  if (Object.keys(user).length != 0) {
    return <Navigate to="/" replace={true} />
  }

  // const handlePassword = () => {}

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-white sm:text-3xl">
            Get started today
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 bg-white rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              {path.pathname == '/login' ? 'Log in' : 'Register'} to your
              account
            </p>

            {path.pathname != '/login' && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>

                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Name"
                  />

                  {/* <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span> */}
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  value={mail}
                  required
                  onChange={(e) => setMail(e.target.value)}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <div onClick={() => setShowPass(!showPass)}>
                    {!showPass ? (
                      <MdOutlineVisibilityOff className="size-4 text-gray-400 cursor-pointer" />
                    ) : (
                      <MdOutlineVisibility className="size-4 text-gray-400 cursor-pointer" />
                    )}
                  </div>
                </span>
              </div>
            </div>
            {path.pathname != '/login' && (
              <>
                <ImageUploader
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                />
                <div>
                  <label htmlFor="coverColor" className="sr-only">
                    Cover color
                  </label>

                  <div className="relative px-4 text-gray-500 text-base">
                    Select Cover color
                    <input
                      value={bgcolor}
                      onChange={(e) => setBgcolor(e.target.value)}
                      type="color"
                      className="w-1/6 h-10 mx-4 rounded-lg cursor-pointer border-gray-200 p-2 text-sm shadow-sm"
                    />
                  </div>
                </div>
                <div className=" p-4 w-full mx-auto max-w-2xl">
                  <h4 className="text-xl lg:text-lg ">
                    Do you want to be an Admin?
                  </h4>

                  <div>
                    <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer">
                      <input
                        type="radio"
                        name="isAdmin"
                        checked={isAdmin}
                        onClick={() => setIsAdmin(true)}
                      />
                      <i className="pl-2 text-sm">Yes</i>
                    </label>

                    <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer">
                      <input
                        type="radio"
                        name="isAdmin"
                        checked={!isAdmin}
                        onClick={() => setIsAdmin(false)}
                      />
                      <i className="pl-2 text-sm">No</i>
                    </label>
                  </div>
                </div>
              </>
            )}
            {path.pathname == '/login' && errorData && (
              <p
                className="text-center font-mono text-red-500
            "
              >
                {String(errorData)}
              </p>
            )}

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              {path.pathname == '/login' ? 'Log in' : 'Register'}
            </button>

            <p className="text-center text-sm text-gray-500">
              No account?
              <Link
                className="underline"
                to={`${path.pathname == '/login' ? '/register' : '/login'}`}
              >
                {path.pathname != '/login' ? 'Log in' : 'Register'}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
