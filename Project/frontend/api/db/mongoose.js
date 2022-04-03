const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// mongoose.connect("mongodb//:localhost:27017/project-management",{useNewUrlParser : true}).then(()=>{

// console.log("Connected to MongoDB successfully");

// }).catch((e)=>{
//   console.log("Error conncecting to Mongo DB")
//   console.log(e);
// })

mongoose.connect('mongodb+srv://rajinee:1998@cluster0.tiaaj.mongodb.net/project-management')
.then(()=> {
  console.log('Connected to Database!');
})
.catch(()=>{
  console.log('Connection Failed');
});

//mongoose.set("useCreateIndex",true);
//mongoose.set("useFindAndModify",false);

module.exports ={
  mongoose
};


