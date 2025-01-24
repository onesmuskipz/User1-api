const express = require('express')
const app = express()
app.use(express.json())

// In-memory data store
let users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
]

// Get user by id (provided)
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id))
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.json(user)
})

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users)
})

// Create a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' })
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  }

  users.push(newUser)
  res.status(201).json(newUser)
})

// Update an existing user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id))
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const { name, email } = req.body
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' })
  }

  user.name = name
  user.email = email
  res.json(user)
})

// Delete a user
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id))
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' })
  }

  users.splice(userIndex, 1)
  res.json({ message: 'User deleted successfully' })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
