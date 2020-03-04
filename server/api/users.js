const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//ROUTE: '/api/users/'

//THESE API ROUTES ARE FOR ALL USERS:

//

//SENDING BACK ALL USERS AND ALL BELOW SHOULD ONLY BE VIEWABLE BY ADMIN, CHECK SESSION DATA

//SEND BACK: id and email of all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
