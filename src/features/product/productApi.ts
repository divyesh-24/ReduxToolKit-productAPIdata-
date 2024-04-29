export type Product = {
  id?: string
  name: string
  desc: string
  price: number
  image: string
  bgColor: string
  inStock: boolean
  category: string
}

export async function createProduct(product: Product) {
  const response = await fetch(`http://localhost:3000/products`, {
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

export async function getAllProducts(page = 1) {
  const response = await fetch(
    `http://localhost:3000/products?_page=${page}&_per_page=10`,
  )
  const data = await response.json()

  return {
    data: data.data,
    totalItems: data.items,
    totalPages: data.pages,
  }
}
export async function getProductsById(id: string) {
  const response = await fetch(`http://localhost:3000/products/${id}`)
  const data = await response.json()
  return { data }
}

export async function updateProduct(product: Product) {
  const { id, ...updatedFields } = product

  const response = await fetch(`http://localhost:3000/products/${id}`, {
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

export async function deleteProduct(productId: string) {
  const response = await fetch(`http://localhost:3000/products/${productId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete product')
  }

  return { message: 'Product deleted successfully' }
}
