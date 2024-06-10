
const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');

dotenv.config()


const verifyToken = async(req,res,next)=>{
    const token = req.headers.token;
    if(!token){
        return res.status(401).json({error:"TOken is required"})
    }
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        const vendor = await Vendor.findById(decoded.vendorId)
        if(!vendor){
            return res.status(404).json({error:"Vendor not found"})
        }

        req.vendorId = vendor._id;
        next()

    } catch (error) {
        console.error(error)
        return res.status(501).json({error:"Invalid token"})
    }
}

module.exports = verifyToken