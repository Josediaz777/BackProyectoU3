const express = require("express");
const Curriculum = require("../models/Curriculums");
const router = express.Router();
const fs = require('fs-extra');
const fileUpload = require('express-fileupload');
const { uploadImage, deleteImage } = require("../utils/cloudinary");

router.get("/", async (req, res) => {
  try {
    const curriculums = await Curriculum.find({ deleted: false });
    res.json(curriculums);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const curriculum = await Curriculum.findById(req.params.id);
    if(curriculum == null) return res.status(404).json({message: "No existe este currículum"})
    res.json(curriculum);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", fileUpload({useTempFiles : true,tempFileDir : './uploads'}), async (req, res) => {
  // const {nombre, apellidos} = req.body
  
  try {
    const curriculum = new Curriculum({
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      fecha_nacimiento: req.body.fecha_nacimiento,
      lugar_nacimiento: req.body.lugar_nacimiento,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      email: req.body.email,
      nivel_academico: req.body.nivel_academico,
      cursos_extras: req.body.cursos_extras,
      experiencia_profesional: req.body.experiencia_profesional,
      idiomas: req.body.idiomas,
      hobbies: req.body.hobbies,
      cont_ref: req.body.cont_ref
    });

    if(req.files?.image){
      const result = await uploadImage(req.files.image.tempFilePath)
      curriculum.image = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }

      await fs.unlink(req.files.image.tempFilePath)
    }else{
      curriculum.image = {
        public_id: '',
        secure_url: ''
      }
    }

    const curriculumSaved = await curriculum.save();
    res.json(curriculumSaved);
    // res.send(req.body)
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id",fileUpload({useTempFiles : true,tempFileDir : './uploads'}), async (req, res) => {
  const {id} = req.params
  const findCurr = await Curriculum.findById(id);
  var image_values = findCurr.image
  try {

    if(req.files?.image){
      
      if(findCurr.image.public_id != ""){
        await deleteImage(findCurr.image.public_id)
      }
      
      const result = await uploadImage(req.files.image.tempFilePath)
      image_values = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      
      await fs.unlink(req.files.image.tempFilePath)
    }
    const updatedCurriculum = await Curriculum.findByIdAndUpdate(id, {
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      fecha_nacimiento: req.body.fecha_nacimiento,
      lugar_nacimiento: req.body.lugar_nacimiento,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      email: req.body.email,
      nivel_academico: req.body.nivel_academico,
      cursos_extras: req.body.cursos_extras,
      experiencia_profesional: req.body.experiencia_profesional,
      idiomas: req.body.idiomas,
      hobbies: req.body.hobbies,
      cont_ref: req.body.cont_ref,
      image: image_values
    }, {new: true});

    // if(req.files?.image){

    //   if(updatedCurriculum.image.public_id != ''){
    //     await deleteFile(updatedCurriculum.image.public_id)
    //   }

    //   const result = await uploadImage(req.files.image.tempFilePath)
    //   updatedCurriculum.image = {
    //     public_id: result.public_id,
    //     secure_url: result.secure_url
    //   }
      
    //   await fs.unlink(req.files.image.tempFilePath)
    // }

    res.json(updatedCurriculum);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/delete/:id", async (req, res) => {
  try {
    const curriculumDeleted = await Curriculum.findByIdAndUpdate(req.params.id, {
      deleted: true,
      deletedAt: Date.now(),
    });
    res.json(curriculumDeleted);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {

    const curriculum = await Curriculum.findByIdAndDelete(req.params.id);

    if(curriculum.image.public_id != ''){
      await deleteImage(curriculum.image.public_id)
    }

    res.json({message:"Curiculum eliminado"});
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
