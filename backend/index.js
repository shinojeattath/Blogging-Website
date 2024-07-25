// import and initialization
const express = require('express')
const cors = require('cors')
require('./connection')
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express()

// models
var user = require('./models/user')
var userBlog = require('./models/userBlog')
// end imports

// middleware

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));


// directory

const fs = require('fs');
const dir = './uploads';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


// post API

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


// Signup API


app.post('/post', upload.single('profilePhoto'), async (req, res) => {
    console.log('Received data:', req.body);
    console.log('Received file:', req.file);

    try {
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age ? parseInt(req.body.age) : undefined,
            gender: req.body.gender,
            phone: req.body.phone,
            role: req.body.role || 'user',
            profilePhoto: req.file ? req.file.path : undefined
        };

        console.log('Processed userData:', userData);

        const newUser = new user(userData);
        await newUser.save();
        
        res.status(200).send('Data saved');
        console.log("data stored");
    } catch (error) {
        console.log('Error:', error);
        res.status(400).send('Data not saved\n' + error.message);
    }
});


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