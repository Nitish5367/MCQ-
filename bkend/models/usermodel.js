let mongoose=require('mongoose')
let usersch=new mongoose.Schema(
    {
        "_id":String,
        "name":String,
        "password":String,
        "score":Number,
        "attempt":{
            type:Number,
            default:0
        }
    }
)
module.exports=mongoose.model("user",usersch)