import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
// import { Field } from './FormBuilder'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getFeedbackFormAsync } from '../../Feedback form/feedBackFormSlice'
import { Navigate } from 'react-router-dom'
import { createFeedbackAsync } from '../feedbackSlice'
import { Button } from '@mui/material'

export interface DynamicFormProps {
  [key: string]: string
}

const DynamicForm: React.FC = () => {
  const formData = useAppSelector((s) => s.feedBackForm.feedbacksForm)
  const user = useAppSelector((s) => s.auth.user)
  const dispatch = useAppDispatch()

  const [formValues, setFormValues] = useState<DynamicFormProps>({})
  useEffect(() => {
    dispatch(getFeedbackFormAsync())
  }, [dispatch])

  useEffect(() => {}, [user])
  if (!Object.keys(user).includes('id')) {
    return <Navigate to="/" replace={true} />
  }

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form Data:', { userId: user.id, ...formValues })
    dispatch(createFeedbackAsync({ userId: user.id as string, ...formValues }))
    // You can further process or send the form data to your backend here
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4 bg-white/30  rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
      >
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">FeedBack</h1>
        </div>
        {formData.map((field, index) => (
          <div key={index}>
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formValues[field.name] || ''}
                className="w-full appearance-none  border rounded-lg border-gray-200 p-2 md:p-4 pe-12 text-sm shadow-sm"
                onChange={handleChange}
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                name={field.name}
                rows={4}
                placeholder={field.label}
                value={formValues[field.name] || ''}
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm  placeholder:capitalize"
                onChange={handleChange}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.label}
                value={formValues[field.name] || ''}
                className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm  placeholder:capitalize"
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          sx={{ paddingY: '12px' }}
          className="inline-block w-full  rounded-lg bg-indigo-700 hover:bg-indigo-400 px-5 py-3 text-sm font-medium text-white uppercase"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  )
}

export default DynamicForm
