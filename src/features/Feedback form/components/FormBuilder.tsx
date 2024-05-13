import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  createFeedbackFormFieldAsync,
  deleteFeedbackFormFieldLocalAsync,
  getFeedbackFormAsync,
  updateAllFeedbackFormFieldAsync,
} from '../feedBackFormSlice'
import { Button, Typography } from '@mui/material'

export interface Field {
  id?: string
  type: string
  label: string
  name: string
  options: string[]
  [key: string]: string | string[] | undefined
}

const FormBuilder: React.FC = () => {
  const formData = useAppSelector((s) => s.feedBackForm.feedbacksForm)
  const formDeleteData = useAppSelector((s) => s.feedBackForm.deletedField)
  const dispatch = useAppDispatch()
  const formFieldData = JSON.parse(JSON.stringify(formData))
  const [fields, setFields] = useState<Field[]>([...formFieldData])
  // const [deletedField, setDeletedField] = useState>([] as Field[])
  const deletedField = [...formDeleteData] as Field[]

  useEffect(() => {
    dispatch(getFeedbackFormAsync())
  }, [dispatch])

  const addField = () => {
    const newField: Field = { type: '', label: '', name: '', options: [] }
    setFields([...fields, newField])
  }

  const removeField = (index: number) => {
    const newFields = [...fields]
    // setDeletedField(newFields[index] as Field)
    deletedField.push(newFields[index])
    dispatch(deleteFeedbackFormFieldLocalAsync(deletedField))

    newFields.splice(index, 1)
    setFields(newFields)
  }

  const updateField = (index: number, updatedField: Field) => {
    const newFields = [...fields]
    newFields[index] = updatedField
    setFields(newFields)
  }

  const handleFieldChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    const updatedField = { ...fields[index], [name]: value }
    updateField(index, updatedField)
  }

  // const handleOptionChange = (
  //   fieldIndex: number,
  //   optionIndex: number,
  //   event: ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const { value } = event.target
  //   const newFields = [...fields]

  //   const updatedField = { ...newFields[fieldIndex] }
  //   console.log(updatedField)
  //   updatedField.options[optionIndex] = value
  //   newFields[fieldIndex] = updatedField
  //   setFields(newFields)
  // }

  const handleOptionChange = (
    fieldIndex: number,
    optionIndex: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target

    // Create a deep copy of the fields array
    const newFields = JSON.parse(JSON.stringify(fields))

    // Update the option value
    newFields[fieldIndex].options[optionIndex] = value

    // Set the state with the updated fields array
    setFields(newFields)
  }

  const addOption = (fieldIndex: number) => {
    const newFields = [...fields]
    const updatedField = { ...newFields[fieldIndex] }
    updatedField.options = [...updatedField.options, ''] // Add an empty string for a new option
    newFields[fieldIndex] = updatedField
    setFields(newFields)
  }

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    // const newFields = [...JSON.parse(JSON.stringify(fields))]
    const updatedField = { ...fields[fieldIndex] }
    updatedField.options.splice(optionIndex, 1)
    // newFields[fieldIndex] = updatedField
    // setFields(newFields)
    updateField(fieldIndex, updatedField)
  }

  const generateJSON = () => {
    if (formData.length <= 0) {
      dispatch(createFeedbackFormFieldAsync(fields))
    }
    dispatch(updateAllFeedbackFormFieldAsync({ fields, deletedField }))
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto mb-0 mt-8 w-4/5 space-y-4 bg-white/30  rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl"></h1>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: 'center', paddingY: '5px' }}
          >
            Feedback Form Fields
          </Typography>
        </div>
        {fields.map((field, fieldIndex) => (
          <div
            key={fieldIndex}
            className=" px-4 py-2 rounded-lg bg-indigo-500/30"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row gap-3 justify-stretch items-center p-2  md:w-4/5">
                <input
                  type="text"
                  name="label"
                  placeholder="Label"
                  value={field.label}
                  className="w-full rounded-lg border border-gray-200 p-2 md:p-4 pe-12 text-sm  placeholder:capitalize"
                  onChange={(e) => handleFieldChange(fieldIndex, e)}
                />
                <select
                  name="type"
                  value={field.type}
                  className="w-full appearance-none  border rounded-lg border-gray-200 p-2 md:p-4 pe-12 text-sm shadow-sm"
                  onChange={(e) => handleFieldChange(fieldIndex, e)}
                >
                  <option value="">--- Select Type ---</option>
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Select</option>
                  <option value="number">Number</option>
                  <option value="tel">Tel</option>
                  <option value="email">Email</option>
                  <option value="color">Color</option>
                  <option value="date">Date</option>
                  {/* Add more field types as needed */}
                </select>
                <div className="md:hidden ">
                  {field.type === 'select' && (
                    <div className="py-1 m-1 px-6 mx-auto ">
                      {field.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex flex-col md:flex-row gap-2 md:gap-5 py-2"
                        >
                          <input
                            type="text"
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            className="md:w-2/4 w-full rounded-lg border border-gray-200 p-2 pe-10 text-sm  placeholder:capitalize"
                            onChange={(e) =>
                              handleOptionChange(fieldIndex, optionIndex, e)
                            }
                          />
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ borderRadius: '8px', paddingY: '8px' }}
                            className="inline-block  w-full md:w-1/5  rounded-lg bg-red-700 hover:bg-red-400 py-2 md:px-5 md:py-3 text-sm font-medium text-white uppercase"
                            type="button"
                            onClick={() =>
                              removeOption(fieldIndex, optionIndex)
                            }
                          >
                            Remove Option
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: '8px', paddingY: '8px' }}
                        className="inline-block w-full md:w-fit mt-4 rounded-lg bg-indigo-700 hover:bg-indigo-400 py-2 md:px-5 md:py-3 px-3 text-sm font-medium text-white uppercase"
                        type="button"
                        onClick={() => addOption(fieldIndex)}
                      >
                        Add Option
                      </Button>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Field Name"
                  value={field.name}
                  className="w-full rounded-lg border border-gray-200 p-2 md:p-4 pe-12 text-sm shadow-sm placeholder:capitalize"
                  onChange={(e) => handleFieldChange(fieldIndex, e)}
                />
              </div>

              <Button
                variant="contained"
                color="error"
                sx={{ borderRadius: '8px', paddingY: '8px' }}
                className="inline-block md:w-1/6 w-full h-full rounded-lg bg-red-700 hover:bg-red-400 px-3 py-2 md:py-4 my-4 text-sm font-medium text-white uppercase"
                type="button"
                onClick={() => removeField(fieldIndex)}
              >
                Remove field
              </Button>
            </div>
            <div className="hidden md:block">
              {field.type === 'select' && (
                <div className="py-1 m-1 px-6 mx-auto">
                  {field.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex flex-col md:flex-row gap-2 md:gap-5 py-2"
                    >
                      <input
                        type="text"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        className="md:w-2/4 w-full rounded-lg border border-gray-200 p-2 pe-10 text-sm  placeholder:capitalize"
                        onChange={(e) =>
                          handleOptionChange(fieldIndex, optionIndex, e)
                        }
                      />
                      <Button
                        sx={{ borderRadius: '8px', paddingY: '12px' }}
                        variant="contained"
                        color="error"
                        className="inline-block  w-full md:w-1/5  rounded-lg bg-red-700 hover:bg-red-400 py-2 md:px-5 md:py-3 text-sm font-medium text-white uppercase"
                        type="button"
                        onClick={() => removeOption(fieldIndex, optionIndex)}
                      >
                        Remove Option
                      </Button>
                    </div>
                  ))}
                  <Button
                    color="primary"
                    sx={{ borderRadius: '8px', paddingY: '12px' }}
                    variant="contained"
                    className="inline-block w-full md:w-fit mt-4 rounded-lg bg-indigo-700 hover:bg-indigo-400 py-2 md:px-5 md:py-3 text-sm font-medium text-white uppercase"
                    type="button"
                    onClick={() => addOption(fieldIndex)}
                  >
                    Add Option
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="flex flex-col md:flex-row gap-2 md:gap-5">
          <Button
            color="primary"
            sx={{ borderRadius: '8px', paddingY: '12px' }}
            variant="contained"
            className="inline-block w-full  rounded-lg bg-green-600 hover:bg-green-400 px-5 py-3 text-sm font-medium text-white uppercase"
            type="button"
            onClick={addField}
          >
            Add Field
          </Button>
          <Button
            color="success"
            sx={{ borderRadius: '8px', paddingY: '12px' }}
            variant="contained"
            disabled={JSON.stringify(formData) === JSON.stringify(fields)}
            className="inline-block w-full disabled:bg-gray-300 rounded-lg bg-indigo-700 hover:bg-indigo-400 px-5 py-3 text-sm font-medium text-white uppercase"
            type="button"
            onClick={generateJSON}
          >
            Generate JSON
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FormBuilder
