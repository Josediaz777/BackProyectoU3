const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    
}, { timestamps:true});

module.exports = mongoose.model("users", usersSchema);
