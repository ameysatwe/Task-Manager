const mongoose=require('mongoose')
mongoose.Promise=global.Promise
mongoose.connect("mongodb://localhost:27017/taskman",{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
        .then(()=>console.log("database connected"))
        .catch((e)=>console.log(e))

module.exports=mongoose