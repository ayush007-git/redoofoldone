const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

// Signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) return res.status(400).json({ error: 'User already exists' })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({ username, email, passwordHash })
    await user.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' })

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    res.json({ token, user: { username: user.username, email: user.email } })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router 