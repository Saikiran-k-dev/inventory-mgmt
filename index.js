import express from "express";
import ProductController from "./src/controllers/products.controller.js";
import path from "path"
import ejsLayout from "express-ejs-layouts"
import validateRequest from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/fileUpload.middleware.js";
import UserController from "./src/controllers/users.controller.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";

import { auth } from "./src/middlewares/auth.middleware.js";
const productController = new ProductController()
const userController = new UserController
const app = express();
app.use(express.urlencoded({extended: true}))
app.use(ejsLayout)
app.use(cookieParser())
app.use(setLastVisit)
app.use(session({
  secret:"secretKey",
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false}

}))

app.use(express.static("public"))

app.set("view engine","ejs")
app.set("views",path.join(path.resolve(),'src','views'))
app.get("/",auth, productController.getProducts)
app.get("/new",auth,productController.getNewProduct)
app.get("/register",userController.getUsers)
app.get("/login",userController.getLogin)
app.get("/logout",userController.logout)
app.post("/",uploadFile.single("imageUrl"), productController.addnewProduct)
app.post("/updateProduct",auth,productController.pushUpdateProduct)
app.post("/register",userController.postUserRegistration)
app.post("/login",userController.postUserLogin)

app.get("/updateProduct/:id",auth,productController.getUpdateProductView)
app.post("/deleteProduct/:id",auth,productController.deleteProduct)
app.use(express.static("src/views"));

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
