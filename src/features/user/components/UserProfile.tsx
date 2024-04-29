import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { LuMail } from 'react-icons/lu'
import { FaUserAlt } from 'react-icons/fa'
import { HiMiniDevicePhoneMobile } from 'react-icons/hi2'

interface ProfileProps {}

const UserProfile: React.FC<ProfileProps> = () => {
  const user = useAppSelector((s) => s.auth.user)
  console.log(user)

  return (
    <div className="flex items-center justify-center h-[80vh] bg-transparent">
      <div
        className={`bg-opacity-50   p-8 rounded-lg shadow-md md:w-1/3`}
        style={{ backgroundColor: user.coverColor }}
      >
        <img
          src={`${`data:image/png;base64,${user.profile}` ?? 'https://source.unsplash.com/random/300x300'}`}
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
  )
}

export default UserProfile
