
const express = require('express')
const connection = require('./database/db')
const salesRoute = require('./routes/salesRoute') 

connection.connect(function(err) {
    if(err) {
        console.log(err)
    } else {
        console.log('database is connected..')
    }
})

const app = express()
const port = 3000;

app.use('/',salesRoute)


app.listen(port,() => {
    console.log(`server is running at port ${port}...`)
})