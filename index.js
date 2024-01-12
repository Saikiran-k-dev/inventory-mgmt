import express from "express";
import ProductController from "./src/controllers/products.controller.js";
import path from "path"
import ejsLayout from "express-ejs-layouts"

const productController = new ProductController()

const app = express();
app.use(ejsLayout)
app.set("view engine","ejs")
app.set("views",path.join(path.resolve(),'src','views'))

app.get("/", productController.getProducts)



app.use(express.static("src/views"));

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
