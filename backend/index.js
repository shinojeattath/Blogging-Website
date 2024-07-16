// import and initialization
const express = require('express')
const cors = require('cors')
require('./connection')

const app = express()
app.use(cors())

// models
var user = require('./models/user')
var userBlog = require('./models/userBlog')
// end imports

// middleware

app.use(express.json())

// post API


// Login API
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

// Blog post API
app.post('/postBlog', async(req,res) => {
    try {
        await userBlog(req.body).save()
        res.send('Blog saved')
        console.log("blog saved") 
    } catch (error) {
        console.log(error)
        res.send('Blog not saved\n' + error)
    }
})

// get Blog API everyone
app.get('/getBlog', async(req,res) => {
    try {
        var data = await userBlog.find()
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send('Data not found\n' + error)
    }
})

// get Blog API for user
app.get('/getUserBlog', async(req,res) => {
    try {
        const {email} = req.query
        var data = await userBlog.find({email})
        res.json(data)
    } catch (error) {
        console.log(error)
        res.send('Data not found\n' + error)
    }
})

// get API for login user
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

// post api for new blog 
app.post('/postBlog', async(req,res) => {
    try {
        await userBlog(req.body).save()
        res.send('Blog saved')
        console.log("blog saved") 
    } catch (error) {
        console.log(error)
        res.send('Blog not saved\n' + error)
    }
})
// put api for updating userBlog

app.put('/updateBlog/:id', async(req,res) => {
    try {
        const {id} = req.query
        await userBlog.findByIdAndUpdate(req.params.id, req.body)
        res.send('Blog updated')
    }
    catch (error) {
        console.log(error)
        res.send('Blog not updated\n' + error)
    }
})

//delete api

app.delete('/deleteBlog/:id', async(req,res) => {
    try {
        await userBlog.findByIdAndDelete(req.params.id)
        res.send('Blog deleted')
    }
    catch (error) {
        console.log(error)
        res.send('Blog not deleted\n' + error)
    }
})


// get api for admin to show user
app.get('/getUser', async(req,res) => {
    try {
        var data = await user.find()
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send('Data not found\n' + error)
    }
})

// delete user api

app.delete('/deleteUser/:id', async(req,res) => {
    try {
        await user.findByIdAndDelete(req.params.id)
        res.send('User deleted')
    }
    catch (error) {
        console.log(error)
        res.send('User not deleted\n' + error)
    }
})


// Listen
app.listen(5050, () =>{
    console.log("Server running on 5050")
}) 