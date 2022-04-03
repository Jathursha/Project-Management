const  express = require("express");
const app = express();

const {mongoose} = require ('./db/mongoose');

const bodyParser =require("body-parser");

//const {List, Task}= require('./db/models');

const { List} = require ('./db/models/list.model');
const { Task } = require ('./db/models/task.model');


app.use(bodyParser.json());


app.get("/lists",(req,res)=>{
   List.find({}).then((lists)=>{
      res.send(lists);
   })
})



app.post("/lists",(req,res)=>{
  let title = req.body.title;

  let newList = new List({
    title
  });
  newList.save().then((listDoc)=>{
    res.send(listDoc);
  })
})



app.patch("/lists/:id",(req,res)=>{
   List.findOneAndUpdate({_id:req.params.id},{
     $set:req.body
   }).then(()=>{
     res.sendStatus(200);
   });
})



// app.delete("lists/:id",(req,res)=>{
//    List.findOneAndRemove({_id:req.params.id}).then((removedListDoc)=>{
//      res.send(removedListDoc);
//    })
// })

app.get('/lists/:listId/tasks', (req, res) => {
  Task.find({
      _listId: req.params.listId
  }).then((tasks) => {
      res.send(tasks);

  })
});


app.post('/lists/:listId/tasks',(req,res)=>{
   let newTask = new Task({
     title : req.body.title,
     _listId: req.params.listId
   });
   newTask.save().then((newTaskDoc)=>{
     res.send(newTaskDoc);
   })
})


app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
  Task.findOneAndUpdate({
    _id:req.params.taskId,
    _listId:req.params.listId},{

      $set : req.body
  }).then(()=>{
    res.sendStatus(200);
  })
})

// app.delete('/lists/:listId/tasks/:taskId', (req,res)=>{
//   task.findOneAndRemove({
//       _id: req.params.taskId,
//       _listId: req.params.listId
//   }).then((removedTaskDoc)=>{
//        res.send(removedTaskDoc);
//   })
// })

app.get('/lists/:listId/tasks/:taskId',(req,res)=>{
  Task.findOne({
    _id : req.params.taskId,
    _listId : req.params.listId
  }).then((task)=>{
      res.send(task);
  })
})

app.listen(3000, ()=>{
  console.log("server listening on port 3000");
})
