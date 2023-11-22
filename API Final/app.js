const express = require("express"); 
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json()); 
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

const cart = require("./json/cart/buy.json"); 
const sell = require("./json/sell/publish.json");
const cats = require("./json/cats/cat.json"); 
const userCart = require("./json/user_cart/25801.json");


//Categories
app.get("/categories", (req, res) => {
  res.json(cats); 
});

app.get("/categories/:index", (req, res) => {
  res.json(cats[req.params.index])
});

//Categories products
app.get("/cats_products/:id", (req, res) => {
  const catsProducts = require(`./json/cats_products/${req.params.id}`)
  res.json(catsProducts); 
});

//Products
app.get("/products/:id", (req, res) => {
  const products = require(`./json/products/${req.params.id}`)
  res.json(products); 
});

//Products comments
app.get("/products_comments/:id", (req, res) => {
  const productsComments = require(`./json/products_comments/${req.params.id}`)
  res.json(productsComments); 
});



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
