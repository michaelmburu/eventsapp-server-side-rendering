const handler = () => {
  const eventId = req.query.eventId

  if (req.method === 'POST') {
    const { email, name, text } = req.body

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' })
      return
    }
  }

  const newComment = {
    id: new Date().toISOString(),
    email,
    name,
    text,
  }

  console.log(newComment)

  res.status(201).json({ message: 'Added comment. ', comment: newComment })

  if (req.method === 'GET') {
    const dummyList = [
      { id: 'e1', name: 'Max', text: 'A first comment' },
      { id: 'e2', name: 'Manuel', text: 'A second comment' },
    ]

    res.status(200).json({ comments: dummyList })
  }
}
