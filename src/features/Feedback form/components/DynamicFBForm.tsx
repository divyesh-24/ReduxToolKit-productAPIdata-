import React, { useState } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { createFeedbackFormFieldAsync } from '../feedBackFormSlice'

export interface FeedbackField {
  id?: string
  fieldName: string
  inputType: 'text' | 'number' | 'select'
  label: string
  defaultValue: string | number
  required: boolean
  validate?: string
  options?: string[]
}

const DynamicFBForm: React.FC = () => {
  // const [newOption, setOption] = useState<{
  //   value: string
  // }>()
  const dispatch = useAppDispatch()
  const [fields, setFields] = useState<FeedbackField[]>([
    {
      fieldName: '',
      inputType: 'text',
      label: '',
      defaultValue: '',
      required: false,
      validate: undefined,
      options: [],
    },
  ])

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        fieldName: '',
        inputType: 'text',
        label: '',
        defaultValue: '',
        required: false,
        validate: undefined,
        options: [],
      },
    ])
  }

  const handleRemoveField = (index: number) => {
    const newFields = [...fields]
    newFields.splice(index, 1)
    setFields(newFields)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const data = fields.reduce((result, field) => {
    //   result[field.fieldName] = field.defaultValue
    //   return result
    // }, {} as Field)
    dispatch(createFeedbackFormFieldAsync(fields))
    console.log(fields)
  }

  return (
    <div className="flex items-center  justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border p-4 bg-white gap-5"
      >
        {fields.map((field, index) => (
          <div key={index} className="p-1 flex gap-3">
            <div className="px-2 py-1 border border-red-500">
              <label htmlFor={`fieldName-${index}`}>
                <input
                  id={`fieldName-${index}`}
                  name={`fieldName-${index}`}
                  type="text"
                  value={field.fieldName}
                  placeholder={'Field Name'}
                  onChange={(event) => {
                    const newFields = [...fields]
                    newFields[index].fieldName = event.target.value
                    setFields(newFields)
                  }}
                />
              </label>
            </div>
            <div className="px-2 py-1 border border-red-500">
              <label htmlFor={`label-${index}`}>
                <input
                  id={`label-${index}`}
                  name={`label-${index}`}
                  type="text"
                  placeholder="Label"
                  value={field.label}
                  onChange={(event) => {
                    const newFields = [...fields]
                    newFields[index].label = event.target.value
                    setFields(newFields)
                  }}
                />
              </label>
            </div>
            <div className="px-2 py-1 border border-red-500">
              <label htmlFor={`defaultValue-${index}`}>
                <input
                  id={`defaultValue-${index}`}
                  name={`defaultValue-${index}`}
                  placeholder="Default Value"
                  type="text"
                  value={field.defaultValue}
                  onChange={(event) => {
                    const newFields = [...fields]
                    newFields[index].defaultValue = event.target.value
                    setFields(newFields)
                  }}
                />
              </label>
            </div>
            <div className="px-2 py-1 border border-red-500">
              <label htmlFor={`inputType-${index}`}>
                <select
                  id={`inputType-${index}`}
                  name={`inputType-${index}`}
                  value={field.inputType}
                  onChange={(event) => {
                    const newFields = [...fields]
                    newFields[index].inputType = event.target
                      .value as FeedbackField['inputType']
                    setFields(newFields)
                  }}
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="select">Select</option>
                </select>
              </label>

              {field.inputType === 'select' && (
                <>
                  <label htmlFor={`options-${index}`}>
                    <input
                      id={`options-${index}`}
                      name={`options-${index}`}
                      type="text"
                      placeholder="Add Options"
                      value={JSON.stringify(field.options)}
                      onChange={(event) => {
                        const newFields = [...fields]
                        try {
                          newFields[index].options = JSON.parse(
                            event.target.value,
                          )
                        } catch (error) {
                          console.error(error)
                        }
                        setFields(newFields)
                      }}
                    />
                  </label>
                </>
              )}
            </div>
            <div className="px-2 py-1 border border-red-500">
              <label htmlFor={`required-${index}`}>Required</label>
              <input
                id={`required-${index}`}
                name={`required-${index}`}
                type="checkbox"
                checked={field.required}
                onChange={(event) => {
                  const newFields = [...fields]
                  newFields[index].required = event.target.checked
                  setFields(newFields)
                }}
              />
              {field.inputType === 'text' ||
                (field.inputType === 'number' && (
                  <>
                    <label htmlFor={`validate-${index}`}>Validate</label>
                    <input
                      id={`validate-${index}`}
                      name={`validate-${index}`}
                      type="text"
                      value={field.validate || ''}
                      onChange={(event) => {
                        const newFields = [...fields]
                        newFields[index].validate =
                          event.target.value || undefined
                        setFields(newFields)
                      }}
                    />
                  </>
                ))}
            </div>
            <button
              className="bg-red-300 px-2 py-1 rounded-lg hover:bg-red-500"
              type="button"
              onClick={() => handleRemoveField(index)}
            >
              Remove Field
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-indigo-300 px-2 py-1 rounded-lg hover:bg-indigo-500"
          onClick={handleAddField}
        >
          Add Field
        </button>
        <button
          type="submit"
          className="bg-green-300 px-2 py-1 rounded-lg hover:bg-green-500"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default DynamicFBForm
