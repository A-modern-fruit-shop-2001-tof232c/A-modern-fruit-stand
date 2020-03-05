const router = require('express').Router()
const {Fruit, User, Order, OrderFruit} = require('../db/models')
module.exports = router

// Get cart belonging to the LoggedIn user only if the order hasn't not been paid.
router.get('/', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        paid: false
      },
      include: [{model: Fruit, attributes: ['id', 'name', 'price', 'imgURL']}]
    })
    if (cart) {
      const orderFruitInstance = await OrderFruit.findOne({
        where: {
          orderId: cart.id
        }
      })
      console.log('orderfruit instance', orderFruitInstance)
      const itemTotal = orderFruitInstance.calculateItemsTotal()
      console.log('itemTotal', itemTotal)
      console.log('HI MEEE')
      // console.log('the method', cart.calculateOrderTotal())
      // 1. need to do orderFruit.calculateItemTotal()
      // 2. need to do cart.calculateOrderTotal()
      res.json(cart)
    } else {
      res.json('No items in cart')
    }
  } catch (err) {
    next(err)
  }
})

// TODO: POST route for adding fruit to cart for the LoggedIn user.
router.post('/:fruitId', async (req, res, next) => {
  try {
    const fruitToAdd = await Fruit.findByPk(req.params.fruitId)
    let cart = await Order.findOne({
      where: {
        userId: req.user.id,
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
    // Make a cart for the user.
    // }
  } catch (err) {
    next(err)
  }
})
