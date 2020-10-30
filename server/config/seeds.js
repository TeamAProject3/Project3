const db = require("./connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Materials" },
    { name: "Industrials" },
    { name: "Financial" },
    { name: "Real Estate" },
    { name: "Technology" },
  ]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "GDX",
      description: "VanEck Vectors Gold Miners ETF ",
      image: "vaneckgdx.jpg",
      category: categories[0]._id,
      price: 38.21,
      quantity: 500,
    },
    {
      name: "JETS",
      description: "U.S. Global Jets ETF",
      image: "jets.jpg",
      category: categories[1]._id,
      price: 17.78,
      quantity: 500,
    },
    {
      name: "FNCL",
      category: categories[2]._id,
      description: "Fidelity MSCI Financials Index ETF",
      image: "fidelity.jpg",
      price: 18.99,
      quantity: 20,
    },
    {
      name: "VNQ",
      category: categories[3]._id,
      description: "Vanguard Real Estate Index Fund",
      image: "vanguard.jpg",
      price: 78.97,
      quantity: 50,
    },
    {
      name: "SOXX",
      category: categories[4]._id,
      description: "iShares PHLX Semiconductor ETF",
      image: "ishares.jpg",
      price: 80.65,
      quantity: 45,
    },
    {
      name: "LIT",
      category: categories[0]._id,
      description: "Global X Lithium ETF",
      image: "globalx.jpg",
      price: 42.79,
      quantity: 149,
    },
    {
      name: "PIO",
      category: categories[1]._id,
      description: "Invesco Global Water ETF",
      image: "invesco.jpg",
      price: 32.21,
      quantity: 32,
    },
    {
      name: "DPST",
      category: categories[2]._id,
      description: "Direxion Daily Regional Banks Bull 3X Shares",
      image: "direxion.jpg",
      price: 62.13,
      quantity: 12,
    },
    {
      name: "BBRE",
      category: categories[3]._id,
      description: "JPMorgan BetaBuilders MSCI US REIT ETF",
      image: "jpmorgan.jpg",
      price: 71.65,
      quantity: 112,
    },
    {
      name: "CLOU",
      category: categories[4]._id,
      description: "Global X Cloud Computing ETF",
      image: "cloud.jpg",
      price: 25.11,
      quantity: 1110,
    },
    {
      name: "HACK",
      category: categories[4]._id,
      description: "ETFMG Prime Cyber Security ETF",
      image: "hack.jpg",
      price: 47.58,
      quantity: 67,
    },
    {
      name: "KIE",
      category: categories[2]._id,
      description: "SPDR S&P Insurance ETF",
      image: "spdr.jpg",
      price: 28.77,
      quantity: 52,
    },
  ]);

  console.log("products seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
