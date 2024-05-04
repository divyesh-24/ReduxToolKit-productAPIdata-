import { FeedbackField } from './components/DynamicFBForm'

export async function createFeedbackFormField(feedback: FeedbackField[]) {
  const responses = [] as FeedbackField[]
  for (const feedbackField of feedback) {
    const response = await fetch(`http://localhost:3000/feedbackForm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackField),
    })

    if (!response.ok) {
      throw new Error(
        `Failed to create feedback: ${response.status} ${response.statusText}`,
      )
    }

    const data = await response.json()
    responses.push(data)
    console.log(responses)
  }
  return responses
}
// export async function getFeedbacksByUser(id: string) {
//   const response = await fetch(`http://localhost:3000/feedbacks?userId=${id}`)
//   const data = await response.json()
//   return { data }
// }
export async function getFeedbackForm() {
  const response = await fetch(`http://localhost:3000/feedbacks`)
  const data = await response.json()
  return { data }
}

export async function updateFeedbackForm(feedback: FeedbackField) {
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

export async function deleteFeedbackFormField(feedbackId: string) {
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

export async function deleteAllFeedbacks(feedbacks: FeedbackField[]) {
  const promises = feedbacks.map((feedback) =>
    deleteFeedbackFormField(feedback.id as string),
  )
  await Promise.all(promises)
  return { message: 'All feedbacks deleted successfully' }
}
