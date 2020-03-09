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

// PUT route for adding items to cart for logged in users
router.put('/:fruitId', async (req, res, next) => {
  try {
    // get fruit we're adding
    const fruitToAdd = await Fruit.findByPk(req.params.fruitId)
    const fruitToAddPriceInPennies = fruitToAdd.price * 100
    const addToCart = async () => {
      // get cart we're adding to || create new cart
      const cart = await Order.findOne({
        where: {
          userId: req.user.id,
          paid: false
        },
        include: [{model: Fruit, attributes: ['name', 'price']}]
      })
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
  } catch (error) {
    next(error)
  }
})

router.put('/checkout/:cartId', async (req, res, next) => {
  try {
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
