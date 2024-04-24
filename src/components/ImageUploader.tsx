import React from 'react'

interface ImageUploaderProps {
  setImageFile: React.Dispatch<React.SetStateAction<string>>
  imageFile: string
}

const ImageUploader = ({ setImageFile, imageFile }: ImageUploaderProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target as HTMLInputElement
    if (fileInput.files) {
      const file = fileInput.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64StringUS = reader.result
          ?.toString()
          .replace('data:', '')
          .replace(/^.+,/, '')
        setImageFile(base64StringUS as string)
        // Save the image file to local storage
        //   localStorage.setItem("wallpaperXXX", base64StringUS);
        // Get the image file from local storage
        //   const myImage = localStorage.getItem("wallpaperXXX");
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      {!imageFile && <input type="file" onChange={handleImageChange} />}
      {imageFile && (
        <div className="relative border w-fit rounded-md">
          <img
            src={`data:image/png;base64,${imageFile}`}
            alt="Preview"
            className='object-cover h-36 border border-black rounded-md' 
          />
          <button className="absolute top-3 right-3" onClick={() => setImageFile('')}>
            X
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageUploader
