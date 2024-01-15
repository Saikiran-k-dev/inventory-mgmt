import express from "express";
import ProductController from "./src/controllers/products.controller.js";
import path from "path"
import ejsLayout from "express-ejs-layouts"
import validateRequest from "./src/middlewares/validation.middleware.js";

const productController = new ProductController()

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(ejsLayout)

app.use(express.static("public"))

app.set("view engine","ejs")
app.set("views",path.join(path.resolve(),'src','views'))
app.get("/", productController.getProducts)
app.get("/new",productController.getNewProduct)
app.post("/", productController.addnewProduct)
app.post("/updateProduct",productController.pushUpdateProduct)

app.get("/updateProduct/:id",productController.getUpdateProductView)
app.post("/deleteProduct/:id",productController.deleteProduct)
app.use(express.static("src/views"));

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
