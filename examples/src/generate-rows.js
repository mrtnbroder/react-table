const faker = require('faker')
const Chance = require('chance')

const chance = new Chance()

const mkEntry = (data) => ({
  id: faker.random.uuid(),
  dessert: faker.commerce.productName(),
  calories: chance.integer({ min: 0, max: 999 }),
  fat: chance.floating({ min: 0, max: 99, fixed: 1 }),
  carbs: chance.integer({ min: 0, max: 99 }),
  protein: chance.floating({ min: 0, max: 9.9, fixed: 1 }),
  sodium: chance.integer({ min: 0, max: 999 }),
  calcium: `${chance.integer({ min: 0, max: 100 })}%`,
  iron: `${chance.integer({ min: 0, max: 100 })}%`,
  ...data,
})

module.exports = mkEntry

// process.stdout.write(JSON.stringify(new Array(1000).fill(0).map(mkEntry).map((x, i) => ({ ...x, index: i })), null, 2))
