const express = require("express");
const Curriculum = require("../models/Curriculums");
const router = express.Router();

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
    res.json(curriculum);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
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
    const curriculumSaved = await curriculum.save();
    res.json(curriculumSaved);
    // res.send(req.body)
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCurriculum = await Curriculum.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
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
    const deletedCurriculum = await Curriculum.deleteOne({ _id: req.params.id });
    res.json(deletedCurriculum);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
