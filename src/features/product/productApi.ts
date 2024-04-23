export type Product = {
  id?: string
  name: string
  desc: string
  price: number
  image: string
  bgColor: string
  inStock: boolean
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

export async function getAllProducts() {
  const response = await fetch(`http://localhost:3000/products`)
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
