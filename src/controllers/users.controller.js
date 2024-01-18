import UserModel from "../models/users.model.js"
import ProductModel from "../models/products.models.js"


export default class UserController{
    getUsers(req,res){
        res.render("registration")
    }
    getLogin(req,res){
        res.render("login",{errorMessage:null})
    }
    postUserRegistration(req,res){
        const {name,email,password} = req.body
        UserModel.add(name,email,password)
        res.render("login",{errorMessage:null})
    }

    postUserLogin(req,res){
        const {email,password} = req.body
        const userDetails = UserModel.isValid(email,password)
        if(!userDetails){
            return res.render('login',{errorMessage:"Invalid Credentials!"})
        }
        req.session.userEmail = email;
        const products = ProductModel.get()
        res.render("products",{products:products,userEmail:req.session.userEmail})
        
    }
    logout(req,res){
        req.session.destroy((err)=>{
            if (err){
                console.log(err)
            }
            else{
                res.redirect("/login")
            }
        })
    }
}