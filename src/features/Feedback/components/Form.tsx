import React, { useState } from 'react'
import { fields } from './data'

export interface DynamicFieldData {
  label: string
  inputType: string
  fieldName: string
  defaultValue: any
  options?: { value: string; label: string }[]
  config?: { required: boolean; validate?: (value: any) => string | boolean }
}

export const fields: DynamicFieldData[] = [
  {
    fieldName: 'name',
    inputType: 'text',
    label: 'Name',
    defaultValue: '',
    config: { required: true },
  },
  {
    fieldName: 'age',
    inputType: 'number',
    label: 'Age',
    defaultValue: 18,
    config: {
      required: true,
      validate: (value) => value >= 18 || 'You must be at least 18 years old',
    },
  },
  {
    fieldName: 'language',
    inputType: 'select',
    label: 'Language',
    defaultValue: 'english',
    options: [
      { value: 'english', label: 'English' },
      { value: 'french', label: 'French' },
    ],
  },
]
const Form = () => {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    const formDataValid = validateFormData()
    if (formDataValid) {
      console.log('Form submitted:', formData)
    } else {
      setErrors(formDataValid)
    }
    setIsSubmitting(false)
  }

  const validateFormData = () => {
    const errors = {}
    fields.forEach((field) => {
      if (field.config.required && !formData[field.fieldName]) {
        errors[field.fieldName] = 'This field is required'
      } else if (
        field.config.validate &&
        !field.config.validate(formData[field.fieldName])
      ) {
        errors[field.fieldName] = field.config.validate(
          formData[field.fieldName],
        )
      }
    })
    return errors
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index}>
          <label htmlFor={field.fieldName}>{field.label}</label>
          {field.inputType === 'text' ? (
            <input
              type="text"
              name={field.fieldName}
              value={formData[field.fieldName] || ''}
              onChange={handleInputChange}
            />
          ) : field.inputType === 'number' ? (
            <input
              type="number"
              name={field.fieldName}
              value={formData[field.fieldName] || ''}
              onChange={handleInputChange}
            />
          ) : field.inputType === 'select' ? (
            <select
              name={field.fieldName}
              value={formData[field.fieldName] || ''}
              onChange={handleInputChange}
            >
              {field.options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          ) : (
            <input
              type="checkbox"
              name={field.fieldName}
              checked={formData[field.fieldName] || false}
              onChange={handleInputChange}
            />
          )}
          {errors[field.fieldName] && (
            <div style={{ color: 'red' }}>{errors[field.fieldName]}</div>
          )}
        </div>
      ))}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}

export default Form
