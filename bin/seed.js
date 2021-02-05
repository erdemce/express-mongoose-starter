const mongoose = require('mongoose')
//first check if our db is connected

require("../config/db.config.js")

//require the model

let TodoModel=require("../models/Todo.model.js")

//insert into the model

TodoModel.insertMany([
    {name:"Erdem", description:"Get groceries for today"},
    {name:"Ahmet", description:"do the homework"}
])
.then(()=>{
    console.log("data seeded")
    // always close the connection after seeding
    // please make sure you require mongoose at the top of the file
    mongoose.connection.close()
})
.catch((err)=>{
    console.log("Data seeding went wrong",err)
})
        