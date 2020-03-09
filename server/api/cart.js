const router = require('express').Router()
const {Fruit, User, Order, OrderFruit} = require('../db/models')
module.exports = router

// Get cart belonging to the LoggedIn user only if the order hasn't not been paid.
router.get('/', async (req, res, next) => {
  try {
    const cart = await getCart(req.user.id)
    if (cart) {
      res.json(cart)
    } else {
      res.json('No items in cart')
    }
  } catch (err) {
    next(err)
  }
})

// A POST route for adding fruit to cart for the LoggedIn user.
router.post('/:fruitId', async (req, res, next) => {
  try {
    // The fruit we want to add.
    const fruitToAdd = await Fruit.findByPk(req.params.fruitId)
    // Find the cart for the logged in user.
    let cart = await getCart(req.user.id)
    // converting fruitInstance Price back to pennies
    const fruitToAddPriceInPennies = fruitToAdd.price * 100
    // Does the user have a cart?
    if (cart) {
      // the user has a cart
      // Does the user already have the fruit in the cart?
      const fruit = cart.fruits.find(
        fruitEl => fruitEl.name === fruitToAdd.name
      )
      console.log('fruit:', fruit)
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

// A PUT route to update the quantity of the item from the cart component.
router.put('/:fruitId/:isIncrement', async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err)
  }
})

// Need route to delete item in cart. This is deleting the entire item from the cart component.
router.delete('/:fruitId', async (req, res, next) => {
  try {
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
