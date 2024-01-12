
import ProductModel from "../models/products.models.js"
export default class ProductController{
    
    getProducts(req,res){
        
        let products = ProductModel.get()
        // console.log({products:products})
        res.render("products",{products:products})
        
        
    }
}