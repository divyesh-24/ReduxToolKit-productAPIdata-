export type Product = {
  id?: number
  name: string
  desc: string
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
