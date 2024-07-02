const mongoose = require('mongoose')

const schema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    created_at:{type: String,
        required: true
    },
   
})

const userModel = mongoose.model('userBlog', schema)
module.exports = userModel