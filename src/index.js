// Imports and requires

const express = require("express");
const morgan = require("morgan");
const path = require("path"); // Import the path module to avoid issues with the URIs in the diferents SOs.

// Express initialization

const app = express();

// Simulated Database

let products = [
  {
    id: 1,
    name: "Laptop"
  },
  {
    id: 2,
    name: "Desktop"
  },
  {
    id: 3,
    name: "Screen"
  }
];

// Express Setting

app.set("port", process.env.PORT || 3000);

// Express Middlewares

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  let { name } = req.body;
  products.push({
    id: products.length + 1,
    name
  });
  res.json("Successfully created!");
});

app.put("/products/:id", (req, res) => {
  let { id } = req.params;
  let { name } = req.body;

  products.forEach((product, i) => {
    if (product.id == id) {
      product.name = name;
    }
  });
  res.json("Successfully updated!");
});

app.delete("/products/:id", (req, res) => {
  let { id } = req.params;
  products.forEach((product, i) => {
    if (product.id == id) {
      products.splice(i, 1);
    }
  });

  res.json("Successfully deleted!");
});

// Static Files

app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
