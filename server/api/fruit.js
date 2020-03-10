const router = require('express').Router()
const {Fruit} = require('../db/models')
module.exports = router

//ROUTE: '/api/fruit/'
//SEND BACK: all info for all fruit
router.get('/', async (req, res, next) => {
  try {
    const allFruit = await Fruit.findAll()
    res.json(allFruit)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleFruit = await Fruit.findByPk(req.params.id)
    res.json(singleFruit)
  } catch (error) {
    next(error)
  }
})

//FOR ALL ADMIN ROUTES...CHECK SESSION REQ.USER DATA AND SEE IF ISADMIN IS TRUE BEFORE RESOLVING

//admin route to add a new fruit
router.post('/', async (req, res, next) => {
  try {
    if (req.body.name && req.user.isAdmin) {
      const newFruit = await Fruit.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
      })
      res.status(201).json(newFruit)
    } else {
      //look up what status to send for failed post
      res.json('Added Fruit does not match database model params.')
    }
  } catch (error) {
    next(error)
  }
})
//admin route to delete a fruit
router.delete('/:id', async (req, res, next) => {
  try {
    const fruitToDelete = await Fruit.findByPk(req.params.id)
    if (fruitToDelete && req.user.isAdmin) {
      await fruitToDelete.destroy(fruitToDelete)
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})

//admin route to update an existing fruit
router.put('/:id', async (req, res, next) => {
  try {
    const fruitToUpdate = await Fruit.findByPk(req.params.id)
    if (fruitToUpdate.name && req.user.isAdmin) {
      await fruitToUpdate.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
      })
      res.json(fruitToUpdate)
    } else {
      res.json('That Fruit does not Exist!')
    }
  } catch (error) {
    next(error)
  }
})
