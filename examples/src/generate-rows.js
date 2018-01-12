const faker = require('faker')
const Chance = require('chance')

const chance = new Chance()

const mkEntry = () => ({
  id: faker.random.uuid(),
  dessert: faker.commerce.productName(),
  calories: chance.integer({ min: 0, max: 999 }),
  fat: chance.floating({ min: 0, max: 99, fixed: 1 }),
  carbs: chance.integer({ min: 0, max: 99 }),
  protein: chance.floating({ min: 0, max: 9.9, fixed: 1 }),
  sodium: chance.integer({ min: 0, max: 999 }),
  calcium: `${chance.integer({ min: 0, max: 100 })}%`,
  iron: `${chance.integer({ min: 0, max: 100 })}%`,
})

module.exports = mkEntry

// console.log(new Array(100).fill(0).map(mkEntry))
