
const express = require('express')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const vendorRoutes = require('./Routes/vendorRoutes')
const bodyParser = require('body-parser')
const firmRoutes = require('./Routes/firmRoutes')
const productRoutes = require('./Routes/productRoutes')
const path = require('path')
const cors = require('cors')


dotEnv.config()

const app = express();

app.use(cors())

app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB Connected Successfully")
}).catch((error)=> console.log("Connection Failed :",error ))

app.use('/vendor',vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))




const PORT = 4000;
app.listen(PORT,()=>{
    console.log(`Server running @${PORT}`)
});

app.use('/home',(req,res)=>{
    res.send("<h1>Welcome to Foodie!!</h1>")
})