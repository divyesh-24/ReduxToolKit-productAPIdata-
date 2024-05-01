import React from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { professions } from '../../auth/components/AuthForm'
import { categories } from './AddProduct'
import uploadImage from '../../../components/uploadImage'
import { useAppDispatch } from '../../../app/hooks'
import { createUserAsync } from '../../auth/authSlice'
//@ts-expect-error hash password from backend
import bcrypt from 'bcryptjs'
import { createProductAsync } from '../productSlice'

interface Column {
  name: string
  label: string
  type: string
}

interface Props {
  pathname: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const columns = [
  {
    label: 'User Name',
    type: 'text',
    name: 'user',
  },
  {
    label: 'Profile Picture',
    type: 'file',
    name: 'pic',
  },
  {
    label: 'Email',
    type: 'email',
    name: 'email',
  },
  {
    label: 'Mobile',
    type: 'tel',
    name: 'mobile',
  },
  {
    label: 'Profession',
    type: 'select',
    name: 'profession',
  },
  {
    label: 'Cover Color',
    type: 'color',
    name: 'coverColor',
  },
  {
    label: 'Admin',
    type: 'checkbox',
    name: 'isAdmin',
  },
]
const productsJson = [
  {
    name: 'productName',
    label: 'Product name',
    type: 'text',
  },
  {
    name: 'productPic',
    label: 'Pic',
    type: 'file',
  },
  {
    name: 'productDesc',
    label: 'desc',
    type: 'text',
  },
  {
    name: 'productColor',
    label: 'Color',
    type: 'color',
  },
  {
    name: 'productCategory',
    label: 'Category',
    type: 'select',
  },
  {
    name: 'productPrice',
    label: 'Price',
    type: 'number',
  },
  {
    name: 'availableStocks',
    label: 'Available Stocks',
    type: 'checkbox',
  },
]
type UserDaType = {
  [key: string]: string
}

const AddTableData: React.FC<Props> = ({ pathname, setIsOpen }) => {
  const dispatch = useAppDispatch()
  const [UserData, setUserData] = React.useState({} as UserDaType)
  const [image, setImage] = React.useState<string | null>(null)
  const [imageFile, setImageFile] = React.useState<File>()
  const [errors, setErrors] = React.useState({} as UserDaType)

  const renderColumn = (column: Column) => {
    if (column.type === 'file') {
      return (
        <>
          {!image ? (
            <label
              htmlFor="dropzone-file"
              className="cursor-pointer flex w-fit mx-auto flex-col items-center justify-center rounded-full border-2 border-dashed hover:border-indigo-400 bg-white p-0.5 text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>

              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                required
                onChange={(e) => {
                  setImage(
                    e.target.files && URL.createObjectURL(e.target.files?.[0]),
                  )
                  setImageFile(e.target.files?.[0] as File)
                  setUserData((prevData) => ({
                    ...prevData,
                    [column.name]: e.target.files
                      ? URL.createObjectURL(e.target.files?.[0])
                      : JSON.stringify(e.target.files?.[0]),
                  }))
                }}
              />
            </label>
          ) : (
            <div className="relative w-fit mx-auto">
              <img
                src={image}
                alt="img"
                className="inline-flex items-center text-white justify-center h-10 w-10  font-medium tracking-wide  transition duration-200 rounded-full  shadow-md bg-indigo-200 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
              />
              <button
                className="absolute hover:bg-red-500 bg-red-400 text-white rounded-full -top-1.5 -right-1.5"
                onClick={() => setImage(null)}
              >
                <RiCloseCircleLine className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )
    } else if (column.type === 'select') {
      return (
        <select
          onChange={(e) =>
            setUserData((prevData) => ({
              ...prevData,
              [column.name]: e.target.value,
            }))
          }
          //   value={userData.profession}
          className="w-fit appearance-none cursor-pointer border-gray-400 px-3 text-center text-sm "
        >
          {pathname == '/admin/users' ? (
            <>
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
            </>
          ) : (
            <>
              <option value="Select Category" className="capitalize text-base">
                ----Select Category----
              </option>
              {categories.map((item, index) => (
                <option
                  value={item.category.toLocaleLowerCase()}
                  key={index}
                  className="capitalize text-base"
                >
                  {item.category}
                </option>
              ))}
            </>
          )}
        </select>
      )
    } else {
      return (
        <input
          type={column.type}
          name={column.name}
          placeholder={column.label}
          className="p-1 "
          required
          maxLength={column.type === 'tel' ? 10 : 100}
          onChange={(e) => {
            if (column.type === 'checkbox') {
              setUserData((prevData) => ({
                ...prevData,
                [column.name]: String(e.target.checked),
              }))
            } else if (column.type === 'tel') {
              setUserData((prevData) => ({
                ...prevData,
                [column.name]: e.target.value.replace(/\D/g, ''),
              }))
            } else {
              setUserData((prevData) => ({
                ...prevData,
                [column.name]: e.target.value,
              }))
            }
          }}
        />
      )
    }
  }
  const handleSave = async () => {
    const errors = {} as UserDaType
    if (pathname === '/admin/users') {
      if (!UserData.user || UserData.user.length < 3) {
        errors.user = '**Name must be at least 3 characters'
      }
      if (
        !UserData.email ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(UserData.email)
      ) {
        errors.email = '**Invalid email address'
      }
      if (!UserData.pic) {
        errors.pic = '**Product picture is required'
      }
      if (!UserData.mobile || UserData.mobile.length !== 10) {
        errors.mobile = '**Mobile number must be 10 digits'
      }
      if (!UserData.profession) {
        errors.profession = '**Profession is required'
      }
      if (!UserData.coverColor) {
        errors.coverColor = '**Cover color is required'
      }
      //   if (!UserData.isAdmin) {
      //     errors.isAdmin = 'Admin status is required'
      //   }
    } else {
      if (!UserData.productName || UserData.productName.length < 3) {
        errors.productName = '**Product name must be at least 3 characters'
      }
      if (!UserData.productDesc || UserData.productDesc.length < 3) {
        errors.productDesc =
          '**Product Description must be at least 10 characters'
      }
      if (!UserData.productPic) {
        errors.productPic = '**Product picture is required'
      }
      if (!UserData.productColor) {
        errors.productColor = '**Product color is required'
      }
      if (!UserData.productCategory) {
        errors.productCategory = '**Product category is required'
      }
      if (!UserData.productPrice) {
        errors.productPrice = '**Product price is required'
      }
      //   if (!UserData.availableStocks) {
      //     errors.availableStocks = 'Available stocks is required'
      //   }
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return
    }
    if (pathname == '/admin/products') {
      const newProduct = {
        name: UserData?.productName.trim(),
        desc: UserData?.productDesc.trim(),
        price: Number(UserData?.productPrice),
        image: UserData?.productPic,
        bgColor: UserData?.productColor,
        inStock: Boolean(UserData?.availableStocks),
        category: UserData?.productCategory,
      }
      dispatch(createProductAsync(newProduct))
      console.log(newProduct)
    }
    if (pathname == '/admin/users') {
      const url = await uploadImage(imageFile as File)
      const newUser = {
        name: UserData?.user.trim(),
        email: UserData?.email.trim(),
        coverColor: UserData?.coverColor,
        isAdmin: Boolean(UserData?.isAdmin),
        password: bcrypt.hashSync('default password', bcrypt.genSaltSync(11)),
        profile: url,
        mobileNo: UserData?.mobile,
        profession: UserData?.profession,
      }
      dispatch(createUserAsync(newUser))
      console.log(newUser)
    }
    // If no errors, save the data
    // console.log('Saving data:', UserData)
    setErrors({})
    setIsOpen(false)
  }

  return (
    <tr className="bg-black/15">
      <th scope="col" className="p-4">
        <div className="flex items-center">
          <h1 className="">ID</h1>
        </div>
      </th>
      {pathname === '/admin/users'
        ? columns.map((column, index) => (
            <th
              scope="col"
              key={index}
              className={`px-6 py-3 
               ${column.name === 'user' ? '' : 'text-center'} 
               ${column.type === 'file' ? 'px-6 py-4 font-medium text-gray-900 whitespace-nowrap ' : ''} 
               `}
            >
              <label htmlFor={column.name}>{renderColumn(column)}</label>
              {errors[column.name] && (
                <div className="text-red-500 text-wrap">
                  {errors[column.name]}
                </div>
              )}
            </th>
          ))
        : productsJson.map((column, index) => (
            <th
              scope="col"
              key={index}
              className={`px-6 py-3 ${column.name === 'productName' ? '' : 'text-center'}
              ${column.type === 'file' ? 'px-6 py-4 font-medium text-gray-900 whitespace-nowrap ' : ''} 
              `}
            >
              <label htmlFor={column.label}>{renderColumn(column)}</label>
              {errors[column.name] && (
                <div className="text-red-500 text-wrap">
                  {errors[column.name]}
                </div>
              )}
            </th>
          ))}
      <th scope="col" className="p-4">
        <div className="flex items-center justify-center">
          <button
            className="bg-green-300 px-3 py-2 rounded-lg hover:bg-green-500"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </th>
    </tr>
  )
}

export default AddTableData
