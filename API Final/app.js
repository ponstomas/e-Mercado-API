const express = require("express"); 
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const SECRET_KEY = "CLAVE ULTRA SECRETA";

const app = express();
const port = 3000;

app.use(express.json()); 
app.use(cors());

// Auth
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin@a.com" && password === "admin1234") {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
  }
});

// Middleware que autoriza a realizar peticiones a /cart
app.use("/cart", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});


app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

const cart = require("./json/cart/buy.json"); 
const sell = require("./json/sell/publish.json");
const cats = require("./json/cats/cat.json"); 
const userCart = require("./json/user_cart/25801.json");
const { json } = require("body-parser");


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

//Cart
app.get("/cart", (req, res) => {
  res.json(cart)
})

app.post("/cart", (req, res) => {
  const data = JSON.stringify(req.body, null, 2);
  const filePath = `./json/user_cart/${req.body.user}.json`;

  fs.writeFile(filePath, data, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  res.send("Guardado correctamente")
})



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
