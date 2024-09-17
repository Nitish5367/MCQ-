let express=require('express')
let mongoose=require('mongoose')
let route=require('./routes/route')
let cors=require('cors')
let app=express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://127.0.0.1:27017/mcqapp").then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err)
})
app.use('/',route)
app.listen(5001,()=>{
    console.log("server connected")
})