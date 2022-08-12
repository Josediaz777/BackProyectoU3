const mongoose = require("mongoose");

var subSchema = mongoose.Schema({
    nombre:{
        type: String
    },
    telefono:{
        type: Number
    },
    correo:{
        type: String
    }
},{_id: false});

const CurriculumSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    lugar_nacimiento: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nivel_academico: {
        type: String,
        required: true
    },
    cursos_extras: [{
        type: String,
        required: false
    }],
    experiencia_profesional: {
        type: String,
        required: false
    },
    idiomas: [{
        type: String,
        required: false
    }],
    hobbies: [{
        type: String,
        required: false
    }],
    cont_ref: [subSchema],
    image: {
        public_id: String,
        secure_url: String
    }
    
}, { timestamps:true});

module.exports = mongoose.model("curriculums", CurriculumSchema);
