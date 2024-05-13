import React, { useEffect } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { professions } from '../features/auth/components/AuthForm'
import { categories } from '../features/product/components/AddProduct'
import uploadImage from './uploadImage'
import { useAppDispatch } from '../app/hooks'
import {
  createUserAsync,
  updateUserDataAsync,
} from '../features/auth/authSlice'
//@ts-expect-error hash password from backend
import bcrypt from 'bcryptjs'
import {
  createProductAsync,
  updateProductAsync,
} from '../features/product/productSlice'
import { Product } from '../features/product/productApi'
import { UserType } from '../features/auth/authApi'
import { CgClose } from 'react-icons/cg'
import { Button, Fab, TableCell, TableRow } from '@mui/material'

interface Column {
  name: string
  label: string
  type: string
}

interface Props {
  pathname: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  product?: Product | UserType
  setIsOpenEdit: React.Dispatch<React.SetStateAction<number>>
  no?: number
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
  [key: string]:
    | string
    | number
    | readonly string[]
    | (undefined & boolean)
    | undefined
}

const AddTableData: React.FC<Props> = ({
  pathname,
  setIsOpen,
  product,
  setIsOpenEdit,
  no,
}) => {
  const dispatch = useAppDispatch()
  const [UserData, setUserData] = React.useState({} as UserDaType)
  const [image, setImage] = React.useState<string | null>(null)
  const [imageFile, setImageFile] = React.useState<File>()
  const [errors, setErrors] = React.useState({} as UserDaType)

  useEffect(() => {
    if (product) {
      if ('inStock' in product) {
        setUserData({
          id: product.id,
          productName: product.name,
          productDesc: product.desc,
          productPrice: product.price,
          productColor: product.bgColor,
          productCategory: product.category,
          productPic: product.image,
          availableStocks: String(product.inStock),
        })
        setImage(product.image)
      }
      if ('isAdmin' in product) {
        setUserData({
          id: product?.id as string,
          user: product.name,
          email: product.email,
          coverColor: product.coverColor,
          // isAdmin: product.isAdmin,
          pic: product.profile,
          mobile: product.mobileNo,
          profession: product.profession,
          isAdmin: String(product.isAdmin),
        })
        setImage(product.profile)
      }
    }
  }, [product])

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
          value={UserData?.[column.name]}
          className="w-fit appearance-none cursor-pointer border-gray-400 px-3 py-1 rounded-xl text-center text-sm "
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
          value={UserData?.[column.name]}
          placeholder={column.label}
          className={`rounded-xl ${column.type == 'color' ? 'px-1' : 'px-2 py-1 '}`}
          checked={UserData?.[column.name] == 'true' ? true : false}
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
    // errors shows
    if (pathname === '/admin/users') {
      if (!UserData.user || String(UserData.user).length < 3) {
        errors.user = '**Name must be at least 3 characters'
      }
      if (
        !UserData.email ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          String(UserData.email),
        )
      ) {
        errors.email = '**Invalid email address'
      }
      if (!UserData.pic) {
        errors.pic = '**Product picture is required'
      }
      if (!UserData.mobile || String(UserData.mobile).length !== 10) {
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
    }
    if (pathname == '/admin/products') {
      if (!UserData.productName || String(UserData.productName).length < 3) {
        errors.productName = '**Product name must be at least 3 characters'
      }
      if (!UserData.productDesc || String(UserData.productDesc).length < 3) {
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
    // check updating or create data
    if (pathname == '/admin/products') {
      let url
      if (imageFile) {
        url = await uploadImage(imageFile as File)
      }
      const newProduct = {
        name: String(UserData?.productName).trim(),
        desc: String(UserData?.productDesc).trim(),
        price: Number(UserData?.productPrice),
        image: imageFile ? url : UserData.productPic,
        bgColor: String(UserData?.productColor),
        inStock: UserData?.availableStocks == 'true' ? true : false,
        category: String(UserData?.productCategory),
      }
      if (UserData.id) {
        dispatch(updateProductAsync({ id: String(UserData.id), ...newProduct }))
      }
      if (!Object.keys(UserData).includes('id')) {
        dispatch(createProductAsync(newProduct))
      }
      console.log(newProduct)
    }
    if (pathname == '/admin/users') {
      let url
      if (imageFile) {
        url = await uploadImage(imageFile as File)
      }
      const newUser = {
        name: String(UserData?.user).trim(),
        email: String(UserData?.email).trim(),
        coverColor: String(UserData?.coverColor),
        isAdmin: UserData?.isAdmin == 'true' ? true : false,
        password: bcrypt.hashSync('default password', bcrypt.genSaltSync(11)),
        profile: imageFile ? url : UserData.pic,
        mobileNo: String(UserData?.mobile),
        profession: String(UserData?.profession),
      }
      if (UserData.id) {
        dispatch(updateUserDataAsync({ id: String(UserData.id), ...newUser }))
      }
      if (!Object.keys(UserData).includes('id')) {
        dispatch(createUserAsync(newUser))
      }
      console.log(newUser)
    }
    // If no errors, save the data
    // console.log('Saving data:', UserData)
    setErrors({})
    setIsOpen(false)
    setIsOpenEdit(-1)
  }

  return (
    <TableRow className={UserData?.id ? `bg-indigo-200 ` : 'bg-black/15'}>
      <TableCell scope="col" className="p-4">
        <div className="flex items-center">
          <h1 className="text-gray-700">{no ? no : '--'}</h1>
        </div>
      </TableCell>
      <TableCell scope="col" className="p-4">
        <div className="flex items-center">
          <h1 className="text-gray-700">{UserData?.id ?? '--'}</h1>
        </div>
      </TableCell>

      {pathname === '/admin/users'
        ? columns.map((column, index) => (
            <TableCell
              scope="col"
              key={index}
              className={`px-6 py-3 
               ${column.name === 'user' ? '' : 'text-center'} 
               ${column.type === 'file' ? 'px-6 py-4 font-medium text-gray-900 whitespace-nowrap ' : ''} 
               `}
            >
              <div className="w-full flex justify-center items-center">
                <label htmlFor={column.name}>{renderColumn(column)}</label>
                {errors[column.name] && (
                  <div className="text-red-500 text-wrap">
                    {errors[column.name]}
                  </div>
                )}
              </div>
            </TableCell>
          ))
        : productsJson.map((column, index) => (
            <TableCell
              scope="col"
              key={index}
              className={`px-6 py-3 ${column.name === 'productName' ? '' : 'text-center'}
              ${column.type === 'file' ? 'px-6 py-4 font-medium text-gray-900 whitespace-nowrap ' : ''} 
              `}
            >
              <div className="w-full flex justify-center items-center">
                <label htmlFor={column.label}>{renderColumn(column)}</label>
                {errors[column.name] && (
                  <div className="text-red-500 text-wrap">
                    {errors[column.name]}
                  </div>
                )}
              </div>
            </TableCell>
          ))}
      <TableCell scope="col" className="p-4">
        <div className="flex items-center justify-center gap-5">
          <Button
            variant="contained"
            color="success"
            className="hover:bg-green-300 drop-shadow-md px-3 py-2 rounded-lg text-gray-700 bg-green-500 hover:transition-transform hover:scale-110"
            onClick={handleSave}
          >
            SAVE
          </Button>
          {UserData.id && (
            <Fab
              size="small"
              color="error"
              className="hover:bg-red-500 drop-shadow-sm px-2 py-2 rounded-lg text-gray-700 bg-red-400 hover:transition-transform hover:scale-110"
              onClick={() => setIsOpenEdit(-1)}
            >
              <CgClose className="w-5 h-5" />
            </Fab>
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}

export default AddTableData
