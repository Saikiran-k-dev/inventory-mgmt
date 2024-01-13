
import ProductModel from "../models/products.models.js"
export default class ProductController{
    
    getProducts(req,res){
        
        let products = ProductModel.get()
        // console.log({products:products})
        res.render("products",{products:products})
        
        
    }

    getNewProduct(req,res){
        res.render("newProduct")
    }
    addnewProduct(req,res){
        // access data from form.
        console.log(req.body);
        ProductModel.add(req.body.name,req.body.desc,req.body.price,req.body.imageUrl)
        let products = ProductModel.get();
        res.render('products', {products: products});
    }
}