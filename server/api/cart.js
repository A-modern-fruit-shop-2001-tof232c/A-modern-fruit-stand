const router = require('express').Router()
const {Fruit, User, Order} = require('../db/models')
module.exports = router

// Get cart belonging to the LoggedIn user only if the order hasn't not been paid.
router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        paid: false
      },
      include: [{model: Fruit, attributes: ['name', 'price', 'imgURL']}]
    })
    if (cart) {
      res.json(cart)
    } else {
      res.json('No items in cart')
    }
  } catch (err) {
    next(err)
  }
})

// TODO: POST route for adding fruit to cart for the LoggedIn user.
router.post('/:userId/:fruitId', async (req, res, next) => {
  try {
    const fruitToAdd = await Fruit.findByPk(req.params.fruitId)
    let cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        paid: false
      },
      include: [{model: Fruit, attributes: ['name', 'price', 'imgURL']}]
    })
    // Does the user have a cart?
    // if(cart){
    // Does the user already have the fruit in the cart?
    // If the fruit is already in the cart.
    // Increment the quantity of the fruit in the cart.
    // If the fruit is not in the cart.
    // Add the fruit.
    // Update the total of the order.
    // respond with cart.

    // if the user does not have a cart.
    // }
  } catch (err) {
    next(err)
  }
})
