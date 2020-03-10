const router = require('express').Router()
const {Fruit, Order, OrderFruit} = require('../db/models')
module.exports = router

//ROUTE: '/api/cart/'
// Get cart belonging to the LoggedIn user only if the order hasn't not been paid.
router.get('/', async (req, res, next) => {
  try {
    if (req.user.id !== req.session.passport.user) {
      res.status(302).send('Not your basket!')
      return
    }
    if (req.user.id === req.session.passport.user) {
      const cart = await getCart(req.user.id)
      if (cart) {
        res.json(cart)
      } else {
        res.json('No items in cart')
      }
    }
  } catch (err) {
    next(err)
  }
})

// Think about: A route to add an item to the cart from the singleFruit page <-- This is a POST
// vs
// changing the quantity of the item from the cart component. <-- This is a PUT
// TO DO: PUT route for adding fruit to cart for the LoggedIn user.
// PUT route for adding items to cart for LoggedIn in users
router.put('/:fruitId', async (req, res, next) => {
  try {
    if (req.user.id !== req.session.passport.user) {
      res.status(302).send('Not your basket!')
      return
    }
    if (req.user.id === req.session.passport.user) {
      // get fruit we're adding
      const fruitToAdd = await Fruit.findByPk(req.params.fruitId)
      const fruitToAddPriceInPennies = Number(fruitToAdd.price) * 100
      const addToCart = async () => {
        // get cart we're adding to || create new cart
        const cart = await getCart(req.user.id)
        if (cart) {
          // is fruitToAdd in cart?
          const OrderFruitInstance = await OrderFruit.findOne({
            where: {
              orderId: cart.id,
              fruitId: fruitToAdd.id
            }
          })
          if (OrderFruitInstance) {
            // increment fruit quantity and itemtotal
            // TODO: refractor line 45-50 to use .update() & hooks
            // hint: sequelize.literal
            OrderFruitInstance.increment('quantity', {
              by: Number(req.body.quantity)
            })
            OrderFruitInstance.increment('itemTotal', {
              by: Number(req.body.quantity) * fruitToAddPriceInPennies
            })
            return cart
          } else {
            // associate fruit to cart
            await cart.addFruit(fruitToAdd, {
              through: {
                quantity: Number(req.body.quantity),
                itemPrice: fruitToAddPriceInPennies,
                itemTotal: fruitToAddPriceInPennies * Number(req.body.quantity)
              }
            })
            return cart
          }
        } else {
          // no cart, create new cart
          await Order.create({
            userId: req.user.id
          })
          addToCart()
        }
      }
      const updatedCart = await addToCart()
      // TODO: first time adding fruit, gets error message about updatedCart.fruits being undefined
      console.log('typeof updatedCart.fruits', typeof updatedCart.fruits)
      const orderTotal = updatedCart.fruits.reduce((accumlator, el) => {
        return accumlator + el.orderFruit.itemTotal
      }, 0)
      await updatedCart.update(
        {
          orderTotal: orderTotal
        },
        {
          where: {
            id: updatedCart.id,
            userId: req.user.id,
            paid: false
          },
          returning: true,
          plain: true
        }
      )
      res.json(updatedCart)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/checkout/:cartId', async (req, res, next) => {
  try {
    // TODO: Should this route be protected for a logged in user?
    const cart = await Order.update(
      {
        paid: true
      },
      {
        where: {
          id: req.params.cartId
        }
      }
    )
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

// A PUT route to update the quantity of the item from the cart component.
// TODO: Protect route.
router.put('/:fruitId/:isIncrement', async (req, res, next) => {
  try {
    if (req.user.id !== req.session.passport.user) {
      res.status(302).send('Not your basket!')
      return
    }
    if (req.user.id === req.session.passport.user) {
      let cart = await getCart(req.user.id)

      if (!cart) {
        res.status(404).send('Error 404: No Basket')
        return
      }

      const fruit = cart.fruits.find(
        fruitEl => fruitEl.id === Number(req.params.fruitId)
      )
      if (!fruit) {
        res.status(404).send('This fruit is not in the basket')
        return
      }
      const fruitItem = fruit.orderFruit
      let orderTotal = cart.orderTotal

      // determine the method based on the button press.
      if (req.params.isIncrement === 'true') {
        fruitItem.quantity++
        orderTotal += fruitItem.itemPrice
      } else {
        fruitItem.quantity--
        orderTotal -= fruitItem.itemPrice
      }
      // Must await update before fetching the updatedOrder. Otherwise, you
      // may get stale data.
      if (fruitItem.quantity < 1) {
        await fruitItem.destroy()
      } else {
        await fruitItem.update({quantity: fruitItem.quantity})
      }
      await cart.update({orderTotal: orderTotal})
      const updatedOrder = await getUpdatedOrder(cart.id)

      res.json(updatedOrder)
    }
  } catch (err) {
    next(err)
  }
})

// Need route to delete item in cart. This is deleting the entire item from the cart component.
router.delete('/:fruitId', async (req, res, next) => {
  try {
    if (req.user.id !== req.session.passport.user) {
      res.status(302).send('Not your basket!')
      return
    }
    if (req.user.id === req.session.passport.user) {
      let cart = await getCart(req.user.id)

      if (!cart) {
        res.status(404).send('Error 404: No Basket')
        return
      }

      const fruit = cart.fruits.find(
        fruitEl => fruitEl.id === Number(req.params.fruitId)
      )
      if (!fruit) {
        res.status(404).send('This fruit is not in the basket')
        return
      }

      const fruitItem = fruit.orderFruit
      const priceToSubtract = fruitItem.itemPrice * fruitItem.quantity
      await fruitItem.destroy()
      const newOrderTotal = cart.orderTotal - priceToSubtract
      await cart.update({orderTotal: newOrderTotal})
      // TODO: Figure out whether it is necessary to query the database again
      // for the cart. Why can't the previous cart instance be returned in
      // the client?
      const updatedOrder = await getUpdatedOrder(cart.id)

      res.json(updatedOrder).end()
    }
  } catch (err) {
    next(err)
  }
})

function getCart(userId) {
  return Order.findOne({
    where: {
      userId: userId,
      paid: false
    },
    include: [{model: Fruit, attributes: ['id', 'name', 'price', 'imgURL']}]
  })
}

function getUpdatedOrder(cartId) {
  return Order.findByPk(cartId, {
    include: [{model: Fruit, attributes: ['id', 'name', 'price', 'imgURL']}]
  })
}
