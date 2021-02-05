const mongoose = require('mongoose')
//ensure database is connected
// We connect to our local database here called `todos`
mongoose.connect('mongodb://localhost/todos', { useNewUrlParser: true,
useUnifiedTopology: true,})
    .then((self) => {
        console.log('Yayyy Database is connected');
    })
    .catch(() => {
        console.log('Something went wrong with db connection!');
    })
