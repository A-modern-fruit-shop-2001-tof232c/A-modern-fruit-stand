const router = require('express').Router()
const {Fruit, User, Order} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const currentOrder = await Order.findAll({
      where: {
        userId: req.params.id,
        paid: false
      },
      include: [{model: Fruit, attributes: ['name', 'price', 'imgURL']}]
    })
    res.json(currentOrder)
  } catch (err) {
    next(err)
  }
})
