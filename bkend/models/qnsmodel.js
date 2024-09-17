let mongoose=require('mongoose')
let qnsshc=new mongoose.Schema(
    {
        "_id":String,
        "q":{
            type:String,
            requried:true
        },
        "op1":{
            type:String,
            requried:true
        },
        "op2":{
            type:String,
            requried:true
        },
        "op3":String,
        "op4":String,
        "op5":String,
        "ans":{
            type:String,
            require:true
        }
    }
)
module.exports=mongoose.model("qns",qnsshc)