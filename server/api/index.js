const router = require('express').Router()
module.exports = router

//ROUTES: /api/users
router.use('/users', require('./users'))

//ROUTES: /api/fruit
router.use('/fruit', require('./fruit'))

//ROUTES: /api/order
router.use('/cart', require('./cart'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
