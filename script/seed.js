'use strict'

const db = require('../server/db')
const {User, Order, Fruit, OrderFruit} = require('../server/db/models')

//JASMIN'S NOTE: This faker data below was throwing an error for me and disallowing log in

// const faker = require('faker')

// faker.array = function(structure, count = 1) {
//   let n = 0
//   const results = []

//   while (n < count) {
//     const item = {...structure}

//     Object.keys(item).forEach(property => (item[property] = item[property]()))

//     results.push(item)

//     n++
//   }

//   return count === 1 ? results[0] : results
// }

// let people = faker.array(
//   {
//     email: faker.internet.exampleEmail,
//     password: faker.internet.password
//   },
//   10
// )

// console.log(people)

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Pug',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Brown',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Angela',
      lastName: 'V',
      email: 'angela@email.com',
      password: '123',
      isAdmin: true
    })
    // people.forEach(element => User.create({element}))
  ])

  const orders = await Promise.all([
    Order.create({
      orderTotal: 0,
      paid: false,
      userId: 1
    }),
    Order.create({
      orderTotal: 0,
      paid: true,
      userId: 2
    }),
    Order.create({
      orderTotal: 0,
      paid: false,
      userId: 2
    }),
    Order.create({
      orderTotal: 0,
      paid: false,
      userId: 3
    })
  ])

  const fruits = await Promise.all([
    Fruit.create({
      name: 'Apple',
      description: 'A delicious tarty apple from New York',
      imgURL:
        'https://icons.iconarchive.com/icons/google/noto-emoji-food-drink/512/32349-red-apple-icon.png',
      origin: 'New York',
      price: 49
    }),
    Fruit.create({
      name: 'Pear',
      description: 'Great for programmers when ordering in pairs',
      imgURL:
        'http://t0.gstatic.com/images?q=tbn%3AANd9GcT8AyNUZwWTLisWeZDQVdRgX65uAgsxtYdLrvTgiecg0tfMR9kXOPS_CL2uzC6eWMFHtiQO0ZNR&usqp=CAc',
      origin: 'Genovia',
      price: 149
    }),
    Fruit.create({
      name: 'Lemons',
      description: 'When life gives you them...',
      imgURL:
        'https://cdn4.iconfinder.com/data/icons/vegetables-60/48/Fruits_lemon_food-512.png',
      origin: 'New York',
      price: 49
    })
  ])

  const orderFruitJoinTable = [
    {
      orderId: 1,
      fruitId: 1,
      userId: 1,
      quantity: 1,
      itemPrice: 49,
      itemTotal: 0
    },
    {
      orderId: 1,
      fruitId: 2,
      userId: 1,
      quantity: 1,
      itemPrice: 149,
      itemTotal: 0
    },
    {
      orderId: 1,
      fruitId: 3,
      userId: 1,
      quantity: 1,
      itemPrice: 49,
      itemTotal: 0
    },
    {
      orderId: 2,
      fruitId: 1,
      userId: 2,
      quantity: 1,
      itemPrice: 49,
      itemTotal: 0
    },
    {
      orderId: 2,
      fruitId: 2,
      userId: 2,
      quantity: 1,
      itemPrice: 149,
      itemTotal: 0
    },
    {
      orderId: 3,
      fruitId: 2,
      userId: 2,
      quantity: 1,
      itemPrice: 149,
      itemTotal: 0
    },
    {
      orderId: 3,
      fruitId: 3,
      userId: 2,
      quantity: 1,
      itemPrice: 49,
      itemTotal: 0
    },
    {
      orderId: 4,
      fruitId: 3,
      userId: 3,
      quantity: 1,
      itemPrice: 490,
      itemTotal: 0
    }
  ]
  await Promise.all(
    orderFruitJoinTable.map(instance => {
      return OrderFruit.create(instance)
    })
  )
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${fruits.length} fruits`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
