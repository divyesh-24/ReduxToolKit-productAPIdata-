import { Product } from '../product/productApi'

export type CartProduct = {
  id?: string
  product: Product
  quantity: number
  userId?: string
}

export async function addToCartProduct(product: CartProduct) {
  const response = await fetch(`http://localhost:3000/carts`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(product),
  })
  if (!response.ok) {
    throw new Error('Failed to create product')
  }
  const data = await response.json()

  return { data }
}
export async function syncToCartProduct(
  products: CartProduct[],
  userId: string,
) {
  if (products.length > 0) {
    const newProducts: Product[] = []
    for (const product of products) {
      const response = await addToCartProduct({ ...product, userId })
      newProducts.push(response.data)
    }
    console.log(newProducts)
    return newProducts
  }
}

export async function getCartProductsByUser(id: string) {
  const response = await fetch(`http://localhost:3000/carts?userId=${id}`)
  const data = await response.json()
  return { data }
}
// export async function getProductsById(id: string) {
//   const response = await fetch(`http://localhost:3000/products/${id}`)
//   const data = await response.json()
//   return { data }
// }

export async function updateCartProduct(product: CartProduct) {
  const { id, ...updatedFields } = product

  const response = await fetch(`http://localhost:3000/carts/${id}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(updatedFields),
  })

  if (!response.ok) {
    throw new Error('Failed to update product')
  }
  const data = await response.json()
  return { data }
}

export async function deleteCartProduct(productId: string) {
  const response = await fetch(`http://localhost:3000/carts/${productId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete product')
  }

  return { message: 'Product deleted successfully' }
}

export async function deleteAllCartProducts(productData: CartProduct[]) {
  const promises = productData.map((product) =>
    deleteCartProduct(product.id as string),
  )
  await Promise.all(promises)
  return { message: 'All products deleted successfully' }
}
