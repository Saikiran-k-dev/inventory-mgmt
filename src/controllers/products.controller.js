
import ProductModel from "../models/products.models.js"
export default class ProductController{
    
    getProducts(req,res){
        
        let products = ProductModel.get()
        // console.log({products:products})
        res.render("products",{products:products,userEmail:req.session.userEmail})
        
        
    }

    getNewProduct(req,res){
        res.render("newProduct",{errorMessage:null})
    }
    addnewProduct(req,res){
        // access data from form.
        console.log(req.body);
        const imageUrl = 'images/'+req.file.filename
        console.log(imageUrl)
        ProductModel.add(req.body.name,req.body.desc,req.body.price,imageUrl)
        let products = ProductModel.get();
        res.render('products', {products: products,userEmail:req.session.userEmail});
    }
    getUpdateProductView(req,res){
        const id = req.params.id
        const productFound = ProductModel.getById(id)   
        console.log(productFound)
        if (productFound){
            res.render("updateProduct",{product:productFound,errorMessage:null,})

        }
        else{
            res.status(401).send("product not found")
        }
    }
    pushUpdateProduct(req,res){
        ProductModel.update(req.body)
        console.log(req.body)
        let products = ProductModel.get();
        res.render('products', {products: products,userEmail:req.session.userEmail});
    }
    deleteProduct(req,res){
        const id = req.params.id
        ProductModel.delete(id)
        let products = ProductModel.get()
        res.render('products',{products:products,userEmail:req.session.userEmail})

    }
}