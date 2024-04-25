import React from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'

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
      {!imageFile && (
        <div className="flex min-fit items-center justify-center  font-sans">
          <label
            htmlFor="dropzone-file"
            className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed hover:border-indigo-400 bg-white p-6 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
              Upload File
            </h2>

            <p className="mt-2 text-gray-500 tracking-wide">
              Click to Upload your Profile Pic in PNG or JPG.
            </p>

            <input
              id="dropzone-file"
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      )}
      {/* {!imageFile && <input type="file" onChange={handleImageChange} className='hidden' />} */}
      {imageFile && (
        <div className="flex min-fit items-center justify-center  font-sans">
          <label
            htmlFor="dropzone-file"
            className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-solid hover:border-indigo-400 bg-white p-2 text-center"
          >
            <div className="relative border w-fit rounded-md">
              <img
                src={`data:image/png;base64,${imageFile}`}
                alt="Preview"
                className="object-cover h-36 border border-black rounded-md"
              />
              <RiCloseCircleLine
                className="absolute top-2 w-6 h-6 right-2"
                onClick={() => setImageFile('')}
              />
            </div>
          </label>
        </div>
      )}
    </div>
  )
}

export default ImageUploader
