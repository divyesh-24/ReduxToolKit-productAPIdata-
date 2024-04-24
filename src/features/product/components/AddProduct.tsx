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
            <ImageUploader imageFile={imageFile} setImageFile={setImageFile} />
          </div>
          {/* BGcolor */}
          <div>
            <label htmlFor="bgcolor" className="sr-only">
              BGcolor
            </label>

            <div className="relative flex items-center">
              <label htmlFor="bgcolor">BG Color: Select here</label>

              <input
                type="color"
                name="bgcolor"
                value={bgcolor}
                onChange={(e) => setBgcolor(e.target.value)}
                className="border border-black h-6 w-6 mx-2 rounded-lg"
                placeholder="bgcolor"
              />
            </div>
          </div>
          {/* stock */}
          <div>
            <label htmlFor="stock" className="sr-only">
              Stock
            </label>

            <div className="relative">
              <div>
                <h1>Available in Stock ?</h1>
                <label htmlFor="yes">
                  <input
                    type="radio"
                    id="yes"
                    name="stock"
                    value="true"
                    checked={stock}
                    onClick={() => setStock(true)}
                    className="m-4 mr-1"
                  />
                  Yes
                </label>

                <label htmlFor="no">
                  <input
                    type="radio"
                    name="stock"
                    value="false"
                    id="no"
                    checked={!stock}
                    onClick={() => setStock(false)}
                    className="m-4 mr-1"
                  />
                  No
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
