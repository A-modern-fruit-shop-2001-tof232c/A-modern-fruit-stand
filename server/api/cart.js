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

// TODO: PUT route for adding fruit to cart for the LoggedIn user.
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
        await OrderFruit.update(
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
      cart = await Order.create(
        {
          //
          orderTotal: fruitToAddPriceInPennies * Number(req.body.quantity),
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
          itemTotal: fruitToAddPriceInPennies * Number(req.body.quantity)
        }
      })
    }
    // database call for cart again because of .update(), database calls make copies, not pass by ref.
    const updatedCart = await Order.findOne({
      where: {
        userId: req.user.id,
        paid: false
      },
      include: [{model: Fruit, attributes: ['name', 'price', 'imgURL']}]
    })
    const orderTotal = updatedCart.fruits.reduce((accumlator, el) => {
      return accumlator + el.orderFruit.itemTotal
    }, 0)
    // must make database call .update() to update database, cannot simply assign value to object, again not pass by ref.
    await Order.update(
      {
        orderTotal: orderTotal
      },
      {
        where: {
          id: cart.id,
          userId: req.user.id,
          paid: false
        },
        returning: true,
        plain: true
      }
    )
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
