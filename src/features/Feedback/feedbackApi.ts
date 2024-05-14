import { DynamicFormProps } from './components/DynamicForm'

export async function createFeedback(feedback: DynamicFormProps) {
  const response = await fetch(`http://localhost:3000/feedbacks`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(feedback),
  })
  if (!response.ok) {
    throw new Error('Failed to create feedback')
  }
  const data = await response.json()
  return { data }
}

export async function getFeedbacksByUser(id: string) {
  const response = await fetch(`http://localhost:3000/feedbacks?userId=${id}`)
  const data = await response.json()

  return { data }
}
export async function getFeedbacks() {
  const response = await fetch(`http://localhost:3000/feedbacks`)
  const data = await response.json()
  return { data }
}

export async function updateFeedback(feedback: DynamicFormProps) {
  const { id, ...updatedFields } = feedback

  const response = await fetch(`http://localhost:3000/feedbacks/${id}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(updatedFields),
  })

  if (!response.ok) {
    throw new Error('Failed to update feedback')
  }
  const data = await response.json()
  return { data }
}

export async function deleteFeedback(feedbackId: string) {
  const response = await fetch(
    `http://localhost:3000/feedbacks/${feedbackId}`,
    {
      method: 'DELETE',
    },
  )

  if (!response.ok) {
    throw new Error('Failed to delete feedback')
  }

  return { message: 'Feedback deleted successfully' }
}

export async function deleteAllFeedbacks(feedbacks: DynamicFormProps[]) {
  const promises = feedbacks.map((feedback) =>
    deleteFeedback(feedback.id as string),
  )
  await Promise.all(promises)
  return { message: 'All feedbacks deleted successfully' }
}
