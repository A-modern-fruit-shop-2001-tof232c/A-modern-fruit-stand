const router = require('express').Router()
const {Fruit, Order, OrderFruit} = require('../db/models')
module.exports = router

//ROUTE: '/api/cart/'
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

//ROUTE: '/api/cart/:fruitId'
// TO DO: PUT route for adding fruit to cart for the LoggedIn user.
router.put('/:fruitId', async (req, res, next) => {
  try {
    // The fruit we want to add.
    const fruitToAdd = await Fruit.findByPk(req.params.fruitId)
    // Find the cart for the logged in user.
    let cart = await Order.findOne({
      where: {
        userId: req.user.id,
        paid: false
      },
      include: [{model: Fruit, attributes: ['name', 'price', 'imgURL']}]
    })
    // converting fruitInstance Price back to pennies
    const fruitToAddPriceInPennies = fruitToAdd.price * 100
    // Does the user have a cart?
    if (cart) {
      // the user has a cart
      // Does the user already have the fruit in the cart?
      const fruit = cart.fruits.find(
        fruitEl => fruitEl.name === fruitToAdd.name
      )
      // If the fruit is already in the cart.
      if (fruit) {
        const orderFruitInstance = await OrderFruit.findOne({
          where: {
            orderId: cart.id,
            fruitId: req.params.fruitId
          }
        })
        // Increment the quantity of the fruit in the cart.
        // // Reflect the itemTotal base on the quantity of item.
        orderFruitInstance.calculateItemsTotal()
        const newthing = await OrderFruit.update(
          {
            quantity: (orderFruitInstance.quantity += Number(
              req.body.quantity
            )),
            itemTotal: orderFruitInstance.itemTotal
          },
          {
            where: {
              orderId: cart.id,
              fruitId: req.params.fruitId
            },
            returning: true,
            plain: true
          }
        )
        console.log('JWAIHOESGBNEW THING!!!!!', newthing)
        // // Reflect the orderTotal.
      } else {
        // If the fruit is not in the cart.
        // Add the fruit.
        await cart.addFruit(fruitToAdd, {
          through: {
            quantity: Number(req.body.quantity),
            // can we do: fruitToAdd.calculateItemsTotal()?
            itemTotal: fruitToAddPriceInPennies * Number(req.body.quantity)
          }
        })
      }
      // if the user does not have a cart.
    } else {
      // Make a cart for the user.
      // let newCart
      cart = await Order.create(
        {
          orderTotal: fruitToAddPriceInPennies * Number(req.body.quantity),
          userId: req.user.id
        },
        {
          include: [{model: Fruit}]
        }
      )
      // Add the fruit into the cart.
      // newCart
      await cart.addFruit(fruitToAdd, {
        through: {
          quantity: Number(req.body.quantity),
          itemTotal: fruitToAddPriceInPennies * Number(req.body.quantity)
        }
      })
    }
    const orderTotal = cart.fruits.reduce(
      (accumlator = 0, el) => accumlator + el.orderFruit.itemTotal
    )
    cart.orderTotal = orderTotal
    // await cart.save() ---> this creates internal server error
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
