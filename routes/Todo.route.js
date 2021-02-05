const express = require("express");
const router = express.Router();

const TodoModel = require("../models/Todo.model.js")

// Routes here
router.get('/', (req, res) => {
    res.render('landing.hbs')
})

router.get('/todos', (req, res) => {
    TodoModel.find()
        .then((todos) => {
            res.render('todos.hbs', {
                todos
            })
        })
        .catch(() => {
            console.log("can not get all todos")
        })
})

router.get('/todos/create', (req, res) => {
    res.render("create-form.hbs")
})

router.post('/todos/create', (req, res) => {
    const {
        myTodo,
        myDescription
    } = req.body
    let myNewTodo = {
        name: myTodo,
        description: myDescription
    }

    //create a new todo in your database
    TodoModel.create(myNewTodo)
        .then(() => {
            //sends a page hbs to the user
            // res.render()

            //redirect the user to the /todos page
            // changes the url in the browser
            // like your <a> links
            // res.redirect('/todos')

            // if you want to keep the user on the same page
            //and conditionally render something
            res.render('create-form.hbs', {
                dataAdded: true
            })
        })
        .catch(() => {
            console.log('something went wrong creating')
        })
})
router.get('/todos/:id', (req, res) => {
    //grap the todo id from the url
    let id = req.params.id;
    TodoModel.findById(id)
        .then((todo) => {
            res.render("todo-detail.hbs",{todo})
        })
        .catch(() => {
            console.log("Something went wrong while getting a todo")
        })
})
router.get('/todos/:id/delete', (req, res) => {
    //grap the todo id from the url
    let id = req.params.id;
    TodoModel.findByIdAndDelete(id)
        .then((todo) => {
            res.redirect("/todos")
        })
        .catch(() => {
            console.log("Delete failed")
        })
})

router.get('/todos/:id/edit', (req, res) => {
    //grap the todo id from the url
    let id = req.params.id;
    TodoModel.findById(id)
        .then((todo) => {           
            res.render("edit-form.hbs",{todo})
        })
        .catch(() => {
            console.log("Edit fetched failed")
        })
})
router.post('/todos/:id/edit', (req, res) => {
    let id = req.params.id;
    const {
        myTodo,
        myDescription
    } = req.body
    let editedTodo = {
        name: myTodo,
        description: myDescription
    }
    //update new todo in your database
    TodoModel.findByIdAndUpdate(id,editedTodo)
    .then(()=>{
        res.redirect("/todos")
    })
})
module.exports = router;