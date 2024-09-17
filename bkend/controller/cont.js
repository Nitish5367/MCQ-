let qnsmodel=require('../models/qnsmodel')
let usermodel=require('../models/usermodel')
let jwt=require('jsonwebtoken')
let {v4:uuidv4}=require('uuid')
let addqns=(req,res)=>{
    let id=uuidv4()
    let qnsdata={"_id":id,...req.body}
    let data=new qnsmodel(qnsdata)
    data.save().then(()=>{
        res.json({"msg":"question added sucessfully"})
    }).catch(()=>{
        res.json({"err":"check request fields"})
    })
}
let getqns=(req,res)=>{
    
    qnsmodel.aggregate([{"$sample":{"size":10}}]).exec().then((result)=>{
        res.json(result)
    }).catch((err)=>{
        res.json(err)
    })
}

let adduser=(req,res)=>{
    let data=new usermodel(req.body)
    data.save().then(()=>{
        res.send("user added successfully")
    }).catch(()=>{
        res.send("email exist")
    })
}

let login=async(req,res)=>{
    let data=await usermodel.find(req.body)
    if(data.length==0){
        res.json({"err":"check details"})
    }
    else{
        res.json(
            {
                "token":jwt.sign({"_id":data[0]._id},"abcd"),
                "_id":data[0]._id,
                "name":data[0].name
            }
        )
    }

}

let getattempts=async(req,res)=>{
    let data=await usermodel.findById({"_id":req.params.id})
    res.json({"score":data.score,"count":data.attempt})
}

let upres=async(req,res)=>{
    let userdef=await usermodel.findById({"_id":req.params.id})
    if(userdef.score===undefined || userdef.score<req.params.sc){
        await usermodel.findByIdAndUpdate({"_id":req.params.id},{"score":req.params.sc,"attempt":userdef.attempt+1})
    }
    else{
        await usermodel.findByIdAndUpdate({"_id":req.params.id},{"attempt":userdef.attempt+1})
    }
    if(userdef.score!=undefined){
        res.json({"msg":userdef.score})
    }
    else{
        res.json({"msg":"fa"})
    }
}
module.exports={addqns,getqns,adduser,login,getattempts,upres}