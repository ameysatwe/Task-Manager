const express=require('express')
const app=express()
const {List,Task}=require('./db/models/')
const mongoose=require("./db/mongoose")
const cors=require('cors')
app.use(express.json())
app.use(cors())
app.get("/lists",(req,res)=>{
    List.find({})
        .then(lists => res.send(lists))
        .catch((error)=>console.log(error))
})
//create
app.post("/lists",(req,res)=>{
        (new List({'title':req.body.title}))
        .save()
        .then((list)=>res.send(list))
        .catch((error)=>console.log(error))
})
//read1
app.get('/lists/:listId',(req,res)=>{
    List.find({_id:req.params.listId})
        .then((list)=>res.send(list))
        .catch((error)=>console.log(error))
})
app.patch('/lists/:listId',(req,res)=>{
    List.findOneAndUpdate({'_id':req.params.listId},{$set:req.body})
        .then((list)=>res.send(list))
        .catch((error)=>console.log(error))
})
app.delete('/lists/:listId',(req,res)=>{
    const deleteTasks=(list)=>{
        Task.deleteMany({_listId:list._id})
            .then(()=>list)
            .catch((e)=>console.log(e))
    }
    List.findByIdAndDelete(req.params.listId)
        .then((list)=>res.send(deleteTasks(list)))
        .catch((error)=>console.log(error))

})
//tasks
app.get('/lists/:listId/tasks',(req,res)=>{
    Task.find({_listId:req.params.listId})
        .then((tasks)=>res.send(tasks))
        .catch((error)=>console.log(error))
})
app.post('/lists/:listId/tasks',(req,res)=>{
    (new Task({'title':req.body.title,'_listId':req.params.listId}))
            .save()
            .then((task)=>res.send(task))
            .catch(error=>console.log(error))
})
app.get('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOne({_listId:req.params.listId,_id:req.params.taskId})
        .then((task)=>res.send(task))
        .catch((error)=>console.log(error))
})
app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndUpdate({_listId:req.params.listId,_id:req.params.taskId},{$set:req.body})
        .then((task)=>res.send(task))
        .catch((error)=>console.log(error))
})
app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndDelete({_listId:req.params.listId,_id:req.params.taskId})
        .then((task)=>res.send(task))
        .catch((error)=>console.log(error))
})

app.listen(3000,()=>{
    console.log("server listening at 3000")
})