const express=require('express')
const bodyParser=require('body-parser')
const db=require('./dbConnection')
const app=express()
const cors=require('cors')
const fs = require('fs');
const path=require('path')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static( `${__dirname}/upload`));
const uploadFolder=path.join(__dirname, 'upload')
if(!fs.existsSync(uploadFolder)){
    fs.mkdirSync(uploadFolder)
}
app.use(cors())
const route=require('./routes')
app.use('/laundry_api',route)

app.listen(4047,()=>{
    console.log("Server created successfully at 4000");
})