import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  createProductAsync,
  getProductsByIdAsync,
  updateProductAsync,
} from '../productSlice'
import { useNavigate, useParams } from 'react-router-dom'
import ImageUploader from '../../../components/ImageUploader'
import uploadImage from '../../../components/uploadImage'

interface ProductType {
  name: string
  desc: string
  price: number
  image: string
  bgColor: string
  inStock: boolean
  category: string
}

export const categories = [
  { category: 'Electronics' },
  { category: 'Fashion' },
  { category: 'Books' },
  { category: 'Sports' },
  { category: 'Furniture' },
  { category: 'Food' },
  { category: 'Toys' },
  { category: 'Cars' },
  { category: 'Travel' },
  { category: 'Real Estate' },
]

const AddProduct: React.FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const productData = useAppSelector((state) => state.products.selectedProduct)
  const [stock, setStock] = useState(true)

  const [image, setImage] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [name, setName] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [bgcolor, setBgcolor] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const productDataLoader = useAppSelector((state) => state.products.status)

  useEffect(() => {
    if (id) {
      dispatch(getProductsByIdAsync(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (productDataLoader === 'succeeded') {
      setName(productData.name)
      setDesc(productData.desc)
      setBgcolor(productData.bgColor)
      setPrice(productData.price)
      setStock(productData.inStock)
      setImage(productData.image)
      setCategory(productData.category)
    }
  }, [
    productData.category,
    productDataLoader,
    productData.name,
    productData.desc,
    productData.bgColor,
    productData.image,
    productData.inStock,
    productData.price,
  ])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const url = await uploadImage(imageFile as File)
    const product: ProductType = {
      name: name,
      desc: desc,
      image: url,
      bgColor: bgcolor,
      price: price,
      inStock: stock,
      category,
    }
    if (!id) {
      dispatch(createProductAsync(product))
    } else {
      dispatch(updateProductAsync({ id, ...product }))
    }
    navigate('/admin/products')
    setName('')
    setDesc('')
    setBgcolor('')
    setPrice(0)
    setStock(false)
    setImage('')
    setCategory('Select Category')
  }

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4 bg-white  rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              {!id ? 'ADD' : 'EDIT'} Product
            </h1>
          </div>
          {/* name */}
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>

            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Product Name"
              />
            </div>
          </div>
          {/* description */}
          <div>
            <label htmlFor="description" className="sr-only">
              Description
            </label>

            <div className="relative">
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Description"
              />
            </div>
          </div>
          {/* price */}
          <div>
            <label htmlFor="price" className="sr-only">
              Price
            </label>

            <div className="relative">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.valueAsNumber)}
                required
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Price"
              />
            </div>
          </div>
          {/* category  */}
          <div>
            <label htmlFor="category" className="sr-only">
              category
            </label>

            <div className="relative">
              <h1 className="px-3 text-gray-700">Select Category</h1>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full appearance-none mt-1 rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm  "
              >
                <option
                  value="Select Category"
                  className="capitalize text-base"
                >
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
              </select>
            </div>
          </div>
          {/* Image */}
          <div>
            <div>
              <ImageUploader imageFile={image} setImageFile={setImageFile} />
            </div>
          </div>
          {/* BGcolor */}
          <div>
            <div>
              <label htmlFor="coverColor" className="sr-only">
                Cover color
              </label>

              <div className="relative px-4 text-gray-500 text-base">
                Select color
                <input
                  value={bgcolor}
                  onChange={(e) => setBgcolor(e.target.value)}
                  type="color"
                  className="w-1/6 h-10 mx-4 rounded-lg cursor-pointer border-gray-200 p-2 text-sm shadow-sm"
                />
              </div>
            </div>
          </div>
          {/* stock */}
          <div>
            <div className=" p-4 w-full mx-auto max-w-2xl">
              <h4 className="text-xl lg:text-lg ">Available in Stock ?</h4>

              <div>
                <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer">
                  <input
                    type="radio"
                    name="stock"
                    checked={stock}
                    onClick={() => setStock(true)}
                    defaultChecked
                  />
                  <i className="pl-2 text-sm">Yes</i>
                </label>

                <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer">
                  <input
                    type="radio"
                    name="stock"
                    checked={!stock}
                    onClick={() => setStock(false)}
                  />
                  <i className="pl-2 text-sm">No</i>
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-block w-full  rounded-lg bg-indigo-700 hover:bg-indigo-400 px-5 py-3 text-sm font-medium text-white uppercase"
            >
              {!id ? 'ADD Product' : 'SAVE changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
