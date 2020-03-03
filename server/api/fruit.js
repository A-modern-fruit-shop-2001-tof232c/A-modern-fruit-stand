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
