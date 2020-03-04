const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//ROUTE: '/api/users/'

//THESE API ROUTES WORK DIFFERENT FOR ADMIN, AND INDIVIDUAL USERS. GUESTS CANNOT ACCESS:

//GET SINGLE USER (IF ADMIN, CAN GET ANY, IF INDIVIDUAL, JUST SELF)
router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id)
    //IF USER IS ADMIN OR SINGLEUSER.ID MATCHES REQ.USER.ID, SEND BACK...ELSE AUTH ERROR
    res.json(singleUser)
  } catch (error) {
    next(error)
  }
})
//ADD A USER, THIS IS DONE WHEN SOMEONE SIGNS UP WITH THE SITE
router.post('/', async (req, res, next) => {
  try {
    if (req.body.email) {
      const newUser = await User.create(req.body)
      res.sendStatus(201).json(newUser)
    }
  } catch (error) {
    next(error)
  }
})

//DELETE SINGLE USER (self, IF ADMIN, CAN DELETE ANY)
router.delete('/:id', async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(req.params.id)
    if (userToDelete) {
      //PERFORM ADMIN & REQ.USER CHECK LISTED ABOVE...IF ALLOWED...
      userToDelete.destroy(userToDelete)
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})

//EDIT SINGLE USER (self, IF ADMIN, CAN EDIT ANY)
router.put('/:id', async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.id)
    if (userToUpdate) {
      await userToUpdate.update(req.body)
      res.json(userToUpdate)
    }
  } catch (error) {
    next(error)
  }
})

//THIS API ROUTE IS FOR ADMIN ONLY, CHECK SESSION DATA

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
