const express = require('express')
const User = require('../models/User')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-passwordHash')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router 