import { MongoClient } from 'mongodb'
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address. ' })
      return
    }
    const client = await MongoClient(
      'mongodb+srv://mykeadam:hcZynz4GOsPE9CwR@eventsapp.iwza5vu.mongodb.net/?retryWrites=true&w=majority'
    )
    const db = client.db()
    await db.collection('emails').insertOne({ email: userEmail })

    client.close()
    console.log(userEmail)
    res.status(201).json({ message: 'Signed Up' })
  }
}

export default handler
