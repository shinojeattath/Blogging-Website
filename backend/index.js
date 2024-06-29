// import and initialization
const express = require('express')
const cors = require('cors')
require('./connection')

const app = express()
app.use(cors())
// end imports



// Listen
app.listen(5050, () =>{
    console.log("Server running on 5050")
})