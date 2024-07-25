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
    avatar:{
        type: String,
        default: ''
    },
    likes:{
        type: Number,
        default: 0
    },
    comments:{
        type: Array,
        default: []
    }, 
})

const userModel = mongoose.model('userBlog', schema)
module.exports = userModel