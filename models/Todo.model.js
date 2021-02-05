const mongoose = require('mongoose')

//create your schema here
let TodoSchema = new mongoose.Schema({
    name: String, 
    description: String
})

//create your model here

let TodoModel = mongoose.model('mytodo', TodoSchema)

// do not forget to export your model
module.exports = TodoModel
