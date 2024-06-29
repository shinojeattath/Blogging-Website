const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{type: String,
        required: true
    },
    phone:{type: Number,
        required: true
    }
})

const userModel = mongoose.model('user', schema)
module.exports = userModel