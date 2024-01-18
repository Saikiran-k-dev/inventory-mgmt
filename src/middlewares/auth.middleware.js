export const auth = (req,res,next)=>{
  if(req.session.userEmail){
    console.log(req.session)
    next()
  } else {
    res.redirect("/login")
  }
}