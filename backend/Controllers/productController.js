
const Firm = require('../models/Firm');
const Product = require('../models/Product')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

const addProduct = async(req,res)=>{
    try {
        const  {productName , price , category , bestSeller , description} = req.body
        const image = req.file? req.file.filename: undefined;

        const firmId = req.params.firmId
        const firm = await Firm.findById(firmId)

        if(!firm){
            return res.status(404).json({error : "No firm found"})
        }
        const product = new Product({
            productName , price , category , bestSeller , description , image , firm: firm._id
        })

        const savedProduct = await product.save()
        firm.products.push(savedProduct)

        await firm.save()
        res.status(200).json(savedProduct)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Server error"})
    }
}

const getProductByFirm = async(req,res)=>{
    try {
        const firmId = req.params.firmId
        const firm = await Firm.findById(firmId)
        if(!firm){
            return res.status(404).json({error:"No firm found"})
        }
        const restaurantName = firm.firmName
        const products = await Product.find({firm:firmId});
        res.status(200).json({restaurantName,products});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Server error"})
    }
}

const deleteProductById = async(req,res)=>{
    try {
        const productId = req.params.id 
        const prod = await Product.findByIdAndDelete(productId)
        if(!prod){
            return res.status(404).json({error: "No product found"})
        }
        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Server error"})
    }
}

module.exports = {addProduct: [upload.single('image'),addProduct], getProductByFirm , deleteProductById}