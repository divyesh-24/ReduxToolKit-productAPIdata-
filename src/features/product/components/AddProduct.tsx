import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { createProductAsync, updateProductAsync } from '../productSlice'
import ImageUploader from './ImageUploader'
import { useParams } from 'react-router-dom'

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
  const [stock, setStock] = useState(true)
  const [imageFile, setImageFile] = useState<string>('')
  const nameref = useRef<HTMLInputElement>(null)
  const descref = useRef<HTMLInputElement>(null)
  const priceref = useRef<HTMLInputElement>(null)
  // const imgref = useRef<HTMLInputElement>(null)
  const bgcolorref = useRef<HTMLInputElement>(null)
  // const categoryref = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const productData = useAppSelector((state) =>
    state.products.products.filter((e) => e.id == id),
  )
  console.log(productData)

  useEffect(() => {
    if (
      id &&
      nameref.current &&
      descref.current &&
      bgcolorref.current &&
      priceref.current
    ) {
      nameref.current.value = productData[0].name

      descref.current.value = productData[0].desc

      bgcolorref.current.value = productData[0].bgColor

      priceref.current.value = productData[0].price.toString()

      setStock(productData[0].inStock)
      setImageFile(productData[0].image)
    }
  }, [])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const product: ProductType = {
      name: nameref.current?.value || '',
      desc: descref.current?.value || '',
      image: imageFile,
      bgColor: bgcolorref.current?.value || '',
      price: Number(priceref.current?.value) || 0,
      inStock: stock,
    }
    console.log(product, id)
    if (!id) {
      dispatch(createProductAsync(product))
    } else {
      dispatch(updateProductAsync(product))
    }
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
                ref={nameref}
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
                ref={descref}
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
                ref={priceref}
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
              <label htmlFor="bgcolor">BG Color</label>

              <input
                type="color"
                name="bgcolor"
                ref={bgcolorref}
                required
                className="border border-black h-4"
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
              {/* <input
                type="radio"
                ref={stockref}
                name="inStock"
                value="true"
                required
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Price"
              />
              <label htmlFor="">yes</label> */}
              <div>
                <label htmlFor="yes">
                  <input
                    type="radio"
                    id="yes"
                    name="stock"
                    value="true"
                    checked={stock}
                    onChange={() => setStock(true)}
                  />
                  Yes
                </label>

                <label htmlFor="no">
                  <input
                    type="radio"
                    name="stock"
                    value="false"
                    id="no"
                    checked={stock}
                    onChange={() => setStock(false)}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
          {/* category  */}
          <div>
            <label htmlFor="category" className="sr-only">
              category
            </label>

            <div className="relative">
              {/* <input
                type="search"
                ref={categoryref}
                required
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Price"
              /> */}
              <select name="category" id="category">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>

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
