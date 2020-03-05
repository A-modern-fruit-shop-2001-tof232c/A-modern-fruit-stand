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
    // The fruit we wamt to add.
    const fruitToAdd = await Fruit.findByPk(req.params.fruitId)
    // Find the cart for the logged in user.
    let cart = await Order.findOne({
      where: {
        userId: req.user.id,
        paid: false
      },
      include: [{model: Fruit, attributes: ['name', 'price', 'imgURL']}]
    })

    // Does the user have a cart?
    if (cart) {
      // Does the user already have the fruit in the cart?
      const orderFruitInstance = await OrderFruit.findOne({
        where: {
          orderId: cart.id,
          fruitId: req.params.fruitId
        }
      })

      const fruit = cart.fruits.find(fruit => {
        return fruit.id === req.params.fruitId
      })
      // If the fruit is already in the cart.
      if (fruit) {
        // Increment the quantity of the fruit in the cart.

        orderFruitInstance.quantity += Number(req.body.quantity)

        // // Reflect the itemTotal base on the quantity of item.
        orderFruitInstance.calculateItemsTotal()
        // // Reflect the orderTotal.
      } else {
        // If the fruit is not in the cart.
        // Add the fruit.
        await cart.addFruit(fruitToAdd, {
          through: {
            quantity: Number(req.body.quantity),
            // can we do: fruitToAdd.calculateItemsTotal()?
            itemTotal: fruitToAdd.price * Number(req.body.quantity)
          }
        })
      }
      // if the user does not have a cart.
    } else {
      // Make a cart for the user.
      let newCart = await Order.create(
        {
          orderTotal: fruitToAdd.price * req.body.quantity,
          userId: req.user.id
        },
        {
          include: [{model: Fruit}]
        }
      )
      // Add the fruit into the cart.
      await newCart.addFruit(fruitToAdd, {
        through: {
          quantity: Number(req.body.quantity),
          itemTotal: fruitToAdd.price * Number(req.body.quantity)
        }
      })
    }
    const orderTotal = cart.fruits.reduce(
      (accumlator = 0, el) => accumlator + el.orderFruit.itemTotal
    )
    cart.orderTotal = orderTotal
    await cart.save()
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
