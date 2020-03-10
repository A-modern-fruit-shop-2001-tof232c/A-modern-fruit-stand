const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

// auth/login
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      res
        .status(401)
        .send(
          'Sorry! Your efforts were not fruitful. Try again with the correct username and/or password!'
        )
    } else if (!user.correctPassword(req.body.password)) {
      res
        .status(401)
        .send(
          'Sorry! Your efforts were not fruitful. Try again with the correct username and/or password!'
        )
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

// auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

// auth/logout
router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

// auth/me
router.get('/me', (req, res, next) => {
  try {
    res.json(req.user)
  } catch (error) {
    next(error)
  }
})

router.use('/google', require('./google'))
