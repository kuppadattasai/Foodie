
const express = require('express')
const productController = require('../Controllers/productController')

const router = express.Router()

router.post('/add-product/:firmId',productController.addProduct)

router.get('/:firmId/products',productController.getProductByFirm)

router.get('/uploads/:imgName', (req,res)=>{
    const imgName = req.params.imgName
    res.headersSent('Content-Type', 'image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imgName))
})

router.delete('/:id',productController.deleteProductById)

module.exports = router