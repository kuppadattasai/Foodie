
const express = require('express')
const firmController = require('../Controllers/firmController')
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router()

router.post('/add-firm',verifyToken,firmController.addFirm)

router.get('/uploads/:imgName', (req,res)=>{
    const imgName = req.params.imgName
    res.headersSent('Content-Type', 'image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads',imgName))
})

router.delete('/:id',firmController.deleteFirmById)

module.exports = router;