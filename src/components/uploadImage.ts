import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dzbko6akd',
  api_key: '242566373582124',
  api_secret: '4-5EthoSkNIY-Ok-lUiDqNYSXFg',
})

const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'kkraqajl')

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dzbko6akd/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    )
    const data = await response.json()

    return data.secure_url
  } catch (error) {
    console.error(error)
    throw new Error('Failed to upload image')
  }
}

export default uploadImage
