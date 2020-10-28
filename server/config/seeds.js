const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Materials' },
    { name: 'Industrials' },
    { name: 'Financials' },
    { name: 'Real State' },
    { name: 'Technology' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'GDX',
      description:
        'VanEck Vectors Gold Miners ETF ',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 38.21,
      quantity: 500
    },
    {
      name: 'JETS',
      description:
        'U.S. Global Jets ETF',
      image: 'canned-coffee.jpg',
      category: categories[1]._id,
      price: 17.78,
      quantity: 500
    },
    {
      name: 'FNCL',
      category: categories[2]._id,
      description:
        'Fidelity MSCI Financials Index ETF',
      image: 'toilet-paper.jpg',
      price: 18.99,
      quantity: 20
    },
    {
      name: 'VNQ',
      category: categories[3]._id,
      description:
        'Vanguard Real Estate Index Fund',
      image: 'soap.jpg',
      price: 78.97,
      quantity: 50
    },
    {
      name: 'SOXX',
      category: categories[4]._id,
      description:
        'iShares PHLX Semiconductor ETF',
      image: 'wooden-spoons.jpg',
      price: 80.65,
      quantity: 100
    },
    
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
