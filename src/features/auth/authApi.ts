import { LogInData } from './components/AuthForm'
//@ts-expect-error hash password from backend
import bcrypt from 'bcryptjs'
//@ts-expect-error hash password from backend
import * as jwt from 'jsonwebtoken'

export type UserType = {
  id?: string
  name: string
  email: string
  password: string
  coverColor: string
  isAdmin: boolean
  profile: string
  mobileNo: string
  profession: string
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
  const token = jwt.sign({ userId: data[0].id }, 'your-secret-key', {
    expiresIn: '1h',
  })
  localStorage.setItem('JwtToken', token)

  return { data }
}

export async function getAllUsers(page=1) {
  const response = await fetch(`http://localhost:3000/users?_page=${page}&_per_page=10`)
  const data = await response.json()
  return {
    data: data.data,
    totalItems: data.items,
    totalPages: data.pages,
  }
}
export async function checkUser() {
  const token = localStorage.getItem('JwtToken')

  const decoded = jwt.verify(token, 'My-DeMo')
  if (decoded.userId) {
    const response = await fetch(
      `http://localhost:3000/users?id=${decoded.userId}`,
    )
    const data = await response.json()

    return { data: data[0] }
  }
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

  const token = jwt.sign({ userId: data[0].id }, 'My-DeMo', {
    expiresIn: '1h',
  })

  if (data.length == 0) {
    throw new Error('Failed to Find User')
  }
  const checkPassword = await bcrypt.compareSync(
    userData.password,
    data[0].password,
  )

  if (checkPassword) {
    localStorage.setItem('JwtToken', token)
    return { data: data[0] }
  } else {
    throw new Error('Failed to Login User')
  }
}
export async function logoutUser() {
  localStorage.removeItem('JwtToken')
  return { data: 'Logout Successfully' }
}
export async function updateUserData(product: UserType) {
  const { id, ...updatedFields } = product

  const response = await fetch(`http://localhost:3000/users/${id}`, {
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

// export async function deleteCartProduct(productId: string) {
//   const response = await fetch(`http://localhost:3000/carts/${productId}`, {
//     method: 'DELETE',
//   })

//   if (!response.ok) {
//     throw new Error('Failed to delete product')
//   }

//   return { message: 'Product deleted successfully' }
// }
