import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
// import { Field } from './FormBuilder'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getFeedbackFormAsync } from '../../Feedback form/feedBackFormSlice'

// interface DynamicFormProps {
//   // formData: Field[]
// }

const DynamicForm: React.FC = () => {
  const formData = useAppSelector((s) => s.feedBackForm.feedbacksForm)
  const dispatch = useAppDispatch()

  const [formValues, setFormValues] = useState<{ [key: string]: string }>({})
  useEffect(() => {
    dispatch(getFeedbackFormAsync())
  }, [dispatch])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form Data:', formValues)
    // You can further process or send the form data to your backend here
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-0 mt-8 max-w-md space-y-4 bg-white  rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
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
      <button
        className="inline-block w-full  rounded-lg bg-indigo-700 hover:bg-indigo-400 px-5 py-3 text-sm font-medium text-white uppercase"
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}

export default DynamicForm
