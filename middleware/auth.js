import jwt from "jsonwebtoken"
import cartRouter from "../routes/cartRoute.js"

const authMiddeware = async(req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message: "Not authorized Login please"})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id;
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

export default authMiddeware   