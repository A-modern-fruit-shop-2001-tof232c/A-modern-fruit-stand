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
    if (req.user) {
      if (
        req.user.isAdmin ||
        //req.user.id = singleuser.id
        singleUser.id === req.user.id
      )
        res.json(singleUser)
      else res.sendStatus(401).json('Users can only view their own page.')
    } else res.sendStatus(401).send('No viewing!')
  } catch (error) {
    next(error)
  }
})

//DELETE SINGLE USER (self, IF ADMIN, CAN DELETE ANY)
router.delete('/:id', async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(req.params.id)
    if (userToDelete && req.user) {
      //PERFORM ADMIN & REQ.USER CHECK LISTED ABOVE...IF ALLOWED...
      if (req.user.isAdmin || req.user.id === userToDelete.id) {
        userToDelete.destroy(userToDelete)
        res.sendStatus(204)
      } else {
        //Status for unauthorized (401?)
        res.sendStatus(401)
      }
    }
  } catch (error) {
    next(error)
  }
})

//EDIT SINGLE USER (self, IF ADMIN, CAN EDIT ANY)
router.put('/:id', async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.id)
    if (userToUpdate && req.user) {
      if (req.user.isAdmin || req.user.id === userToUpdate.id) {
        await userToUpdate.update({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        }) //Make sure to pass specific params not full body
        res.json(userToUpdate)
      } else {
        res.sendStatus(401)
      }
    }
  } catch (error) {
    next(error)
  }
})

//THIS API ROUTE IS FOR ADMIN ONLY, CHECK SESSION DATA

//SEND BACK: id and email of all users
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) {
        const users = await User.findAll({
          // explicitly select only the id and email fields - even though
          // users' passwords are encrypted, it won't help if we just
          // send everything to anyone who asks!
          attributes: ['id', 'email', 'firstName', 'lastName']
        })
        res.json(users)
      } else {
        res.sendStatus(401).send('Not Found')
      }
    } else {
      res.sendStatus(401).send('Not Found')
    }
  } catch (err) {
    next(err)
  }
})
