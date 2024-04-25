import { LogInData } from './components/AuthForm'
//@ts-expect-error hash password from backend
import bcrypt from 'bcryptjs'

export type UserType = {
  id?: string
  name: string
  email: string
  password: string
  coverColor: string
  isAdmin: boolean
  profile: string
}

export async function createUser(userData: UserType) {
  const response = await fetch(`http://localhost:3000/users`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(userData),
  })
  if (!response.ok) {
    throw new Error('Failed to create User')
  }
  const data = await response.json()
  return { data }
}

export async function getAllUsers() {
  const response = await fetch(`http://localhost:3000/users`)
  const data = await response.json()
  return { data }
}
export async function getUserByEmail(userData: LogInData) {
  if (!userData.email) {
    throw new Error('Failed to get User')
  }
  const response = await fetch(
    `http://localhost:3000/users?email=${userData.email}`,
  )

  if (!response.ok) {
    throw new Error('Failed to get User')
  }
  const data = await response.json()
  if (data.length == 0) {
    throw new Error('Failed to Find User')
  }
  const checkPassword = await bcrypt.compareSync(
    userData.password,
    data[0].password,
  )

  if (checkPassword) {
    return { data }
  } else {
    throw new Error('Failed to Login User')
  }
}

// export async function updateCartProduct(product: UserType) {
//   const { id, ...updatedFields } = product

//   const response = await fetch(`http://localhost:3000/carts/${id}`, {
//     method: 'PATCH',
//     headers: { 'content-type': 'application/json' },
//     body: JSON.stringify(updatedFields),
//   })

//   if (!response.ok) {
//     throw new Error('Failed to update product')
//   }
//   const data = await response.json()
//   return { data }
// }

// export async function deleteCartProduct(productId: string) {
//   const response = await fetch(`http://localhost:3000/carts/${productId}`, {
//     method: 'DELETE',
//   })

//   if (!response.ok) {
//     throw new Error('Failed to delete product')
//   }

//   return { message: 'Product deleted successfully' }
// }
