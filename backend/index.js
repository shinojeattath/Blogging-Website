// import and initialization
const express = require('express')
const cors = require('cors')
require('./connection')

const app = express()
app.use(cors())

var user = require('./models/user')
// end imports

// middleware

app.use(express.json())

// post API

app.post('/post', async(req,res) => {
    try {
        await user(req.body).save()
        res.send('Data saved')
        console.log("data stored") 
    } catch (error) {
        console.log(error)
        res.send('Data not saved\n' + error)
    }
})

// get API

app.get('/get', async(req,res) =>{
    try {
        const {email} = req.query
        var data = await user.findOne({email})
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send('Data not found\n' + error)
    }
})

// Listen
app.listen(5050, () =>{
    console.log("Server running on 5050")
})