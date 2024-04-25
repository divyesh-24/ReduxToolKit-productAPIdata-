import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  createProductAsync,
  getProductsByIdAsync,
  updateProductAsync,
} from '../productSlice'
import { useNavigate, useParams } from 'react-router-dom'
import ImageUploader from '../../../components/ImageUploader'

interface ProductType {
  name: string
  desc: string
  price: number
  image: string
  bgColor: string
  inStock: boolean
  // category: string
}
const AddProduct: React.FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const productData = useAppSelector((state) => state.products.selectedProduct)
  const [stock, setStock] = useState(true)
  const [imageFile, setImageFile] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [bgcolor, setBgcolor] = useState<string>('')
  const productDataLoder = useAppSelector((state) => state.products.status)

  useEffect(() => {
    if (id) {
      dispatch(getProductsByIdAsync(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (productDataLoder === 'succeeded') {
      setName(productData.name)
      setDesc(productData.desc)
      setBgcolor(productData.bgColor)
      setPrice(productData.price)
      setStock(productData.inStock)
      setImageFile(productData.image)
    }
  }, [
    productDataLoder,
    productData.name,
    productData.desc,
    productData.bgColor,
    productData.image,
    productData.inStock,
    productData.price,
  ])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const product: ProductType = {
      name: name,
      desc: desc,
      image: imageFile,
      bgColor: bgcolor,
      price: price,
      inStock: stock,
    }
    if (!id) {
      dispatch(createProductAsync(product))
    } else {
      dispatch(updateProductAsync({ id, ...product }))
    }
    navigate('/')
  }

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            {!id ? 'ADD' : 'EDIT'} Product
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
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
          {/* Image */}
          <div>
            <div>
              <ImageUploader
                imageFile={imageFile}
                setImageFile={setImageFile}
              />
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
          {/* category  */}
          {/* <div>
            <label htmlFor="category" className="sr-only">
              category
            </label>

            <div className="relative">
              
              <select name="category" id="category">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div> */}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              {!id ? 'ADD' : 'SAVE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
