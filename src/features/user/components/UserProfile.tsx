import React, { FormEventHandler, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { LuMail } from 'react-icons/lu'
import { FaRegEdit, FaUserAlt } from 'react-icons/fa'
import { HiMiniDevicePhoneMobile } from 'react-icons/hi2'
import { MdOutlineWorkOutline } from 'react-icons/md'
import ImageUploader from '../../../components/ImageUploader'
import { professions } from '../../auth/components/AuthForm'
import { updateUserDataAsync } from '../../auth/authSlice'
import uploadImage from '../../../components/uploadImage'
import { Navigate, useParams } from 'react-router-dom'

interface ProfileProps {}

const UserProfile: React.FC<ProfileProps> = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const user = useAppSelector((s) => s.auth.user)
  const [edit, setEdit] = useState(false)
  const [userData, setUserData] = useState({ ...user })

  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (imageFile) {
      try {
        const url = await uploadImage(imageFile as File)
        setEdit(false)
        dispatch(updateUserDataAsync({ ...userData, profile: url }))
      } catch (error) {
        console.error(error)
      }
    }
    setEdit(false)
    dispatch(updateUserDataAsync({ ...userData }))
  }

  useEffect(() => {
    if (id) {
      setEdit(true)
    }
  }, [dispatch, edit, id])

  if (Object.keys(user).length == 0) {
    return <Navigate to="/" replace={true} />
  }
  return (
    <>
      {!edit ? (
        <div className="flex items-center justify-center h-[80vh] bg-transparent">
          <div
            className={`bg-opacity-50 relative p-8 rounded-lg shadow-md md:w-1/3`}
            style={{ backgroundColor: user.coverColor }}
          >
            <FaRegEdit
              className="w-5 h-5 absolute top-2 right-2 cursor-pointer"
              onClick={() => setEdit(!edit)}
            />
            <img
              // src={`data:image/png;base64,${user.profile}`}
              src={user.profile}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 opa100 border border-indigo-700 p-1"
            />
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              {user.name}
            </h1>
            <p className="text-sm text-gray-600 text-center capitalize">
              {user.profession ?? 'Frontend Developer'}
            </p>
            <ul className="mt-4">
              <li className="flex items-center text-gray-700">
                <FaUserAlt className="h-5 w-5 mr-2" />

                {user.isAdmin ? 'Admin User' : 'User'}
              </li>
              <li className="flex items-center text-gray-700">
                <LuMail className="h-5 w-5 mr-2" />

                {user.email}
              </li>
              <li className="flex items-center text-gray-700">
                <HiMiniDevicePhoneMobile className="h-5 w-5 mr-2" />
                {user.mobileNo ?? '(123) 456-7890'}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className=" w-full m-6 pt-10 md:w-1/2  lg:w-1/3 space-y-4 bg-white rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <h1 className="w-full text-center text-2xl sm:text-3xl font-bold">
              Edit Profile
            </h1>
            {/* name */}
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={userData.name}
                  required
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
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
            {/* email  */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  value={userData.email}
                  required
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
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
            {/* mobile  */}
            <div>
              <label htmlFor="name" className="sr-only">
                Mobile Number
              </label>

              <div className="relative">
                <input
                  type="tel"
                  value={userData.mobileNo}
                  required
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      mobileNo: e.target.value.replace(/\D/g, ''),
                    })
                  }
                  maxLength={10}
                  // onChange={(e) => setMobileNo(e.target.valueAsNumber)}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Mobile Number"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <HiMiniDevicePhoneMobile className="size-4 text-gray-400" />
                </span>
              </div>
            </div>
            {/* category  */}
            <div>
              <label htmlFor="category" className="sr-only">
                category
              </label>

              <div className="relative">
                <h1 className="px-3 text-gray-700 mt-6">
                  Select Your Profession
                </h1>
                <select
                  onChange={(e) =>
                    setUserData({ ...userData, profession: e.target.value })
                  }
                  value={userData.profession}
                  className="w-full appearance-none mt-1 cursor-pointer rounded-lg border-gray-400 p-4 pe-12 text-sm shadow-sm  "
                >
                  <option
                    value="Select Profession"
                    className="capitalize text-base"
                  >
                    ----Select Profession----
                  </option>
                  {professions.map((item, index) => (
                    <option
                      value={item.profession.toLocaleLowerCase()}
                      key={index}
                      className="capitalize text-base"
                    >
                      {item.profession}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4 top-7">
                  <MdOutlineWorkOutline className="size-4 text-gray-400" />
                </span>
              </div>
            </div>
            {/* image  */}
            <ImageUploader
              imageFile={user.profile}
              setImageFile={setImageFile}
            />
            <div>
              <label htmlFor="coverColor" className="sr-only">
                Cover color
              </label>

              <div className="relative px-4 text-gray-500 text-base">
                Select Cover color
                <input
                  value={userData.coverColor}
                  onChange={(e) =>
                    setUserData({ ...userData, coverColor: e.target.value })
                  }
                  type="color"
                  className="w-1/6 h-10 mx-4 rounded-lg cursor-pointer border-gray-200 p-2 text-sm shadow-sm"
                />
              </div>
            </div>
            <div className="flex gap-3 justify-between mt-8">
              <button
                onClick={() => setEdit(false)}
                className="block w-1/2 rounded-lg bg-indigo-100 px-5 py-3 text-sm font-medium "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="block w-1/2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default UserProfile
