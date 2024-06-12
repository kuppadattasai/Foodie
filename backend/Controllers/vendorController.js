
const vendor = require('../models/Vendor')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Vendor = require('../models/Vendor')
const dotEnv = require('dotenv')

dotEnv.config()

const vendorRegister = async(req,res)=>{
    const { username , email , password} = req.body
    try {
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("email already taken")
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newVendor = new Vendor({
            username,email,password:hashedPassword
        })
        
        await newVendor.save();

        res.status(201).json({message: "Vendor registered successfully"});
        console.log("registered")

    } catch (error) {
        console.log(error)
        res.status(501).json({message: "Server Error"})
    }

}


const vendorLogin = async(req,res)=>{
    const {email , password} = req.body;
    try {
        const vendor = await Vendor.findOne({email})
        if(!vendor || !(await bcrypt.compare(password, vendor.password))){
         return res.status(401).json({error :"User not found"})
        }
        console.log("first")
        const token = jwt.sign({vendorId : vendor._id} , process.env.SECRET_KEY , {expiresIn :"1h"})
        const vendorId = vendor._id
        console.log(email, "Token is ", token)
        return res.status(200).json({success: "Login Successful", token, vendorId})
    } catch (error) {
        console.log(error)
     return res.status(501).json({message: "Server Error"})
    }
}

const getAllVendors = async(req,res)=>{
    try {
        const vendors = await Vendor.find().populate('firm')

        res.json({vendors})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
}

const getVendorById = async(req,res)=>{
    const vendorId = req.params.id;
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            res.status(401).json({error: "Vendor not found"})
        }
        const vendorFirmId = vendor.firm[0]._id;
        res.status(202).json({vendor,vendorFirmId})
        console.log(vendorFirmId)
    } catch (error) {
        console.log(error)
        res.status(500).json({error :"Server error"})
    }

}

module.exports = { vendorRegister, vendorLogin , getAllVendors , getVendorById }