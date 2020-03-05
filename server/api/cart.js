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
    const orderFruitInstance = await OrderFruit.findOne({
      where: {
        orderId: cart.id
      }
    })
    const itemTotal = orderFruitInstance.calculateItemsTotal()
    // 1. need to do orderFruit.calculateItemTotal()
    // 2. need to do cart.calculateOrderTotal()
    // Does the user have a cart?
    if (cart) {
      // Does the user already have the fruit in the cart?
      const fruit = cart.fruits.find(fruit => {
        return fruit.id === req.params.fruitId
      })
      // If the fruit is already in the cart.
      if (fruit) {
        // Increment the quantity of the fruit in the cart.
        const fruitItem = fruit.orderFruit
        fruitItem.quantity += Number(req.body.quantity)
        // Reflect the itemTotal base on the quantity of item.
        fruitItem.itemTotal = fruitItem.quantity * fruitItem.itemPrice
        // Reflect the orderTotal.
        cart.orderTotal += fruit.price * Number(req.body.quantity)
        await fruitItem.save()
        await cart.save()
        res.json(cart)
      } else {
        // If the fruit is not in the cart.
        // Add the fruit.
        await cart.addFruit(fruitToAdd, {
          through: {
            quantity: Number(req.body.quantity),
            itemPrice: fruitToAdd.price
          }
        })
        // Reflect the orderTotal.
        cart.orderTotal += fruitToAdd.price * Number(req.body.quantity)
        await cart.save()
        // respond with cart.
        res.json(cart)
      }
      // if the user does not have a cart.
    } else {
      // Make a cart for the user.
      cart = await Order.create(
        {
          orderTotal: fruitToAdd.price * req.body.quantity,
          userId: req.user.id
        },
        {
          include: [{model: Fruit}]
        }
      )
      // Add the fruit into the cart.
      await cart.addFruit(fruitToAdd, {
        through: {
          quantity: Number(req.body.quantity),
          itemPrice: fruitToAdd.price
        }
      })
      res.json(cart)
    }
  } catch (err) {
    next(err)
  }
})
