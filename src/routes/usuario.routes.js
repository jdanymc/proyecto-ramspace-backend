const express = require("express");
const {prisma,verifyToken} = require("../db");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("../config");

router.get("/usuario",verifyToken, async (req, res) => {
  const data = await prisma.tbl_usuario.findMany({
    select:{
      idusuario:true,
      email:true,
      tipo:true,
      primerapellido:true,
      segundoapellido:true,
      nombres:true,
      imagen:true,
      estado:true,
    }
  });
  res.json({
    status: true,
    content: data,
  });
});

router.post("/usuario", async (req, res) => {
  const passwordEncriptado = bcrypt.hashSync(req.body.password, 10);
  const newData = await prisma.tbl_usuario.create({
    data: {
      ...req.body,
      password: passwordEncriptado,
    },
  });
  res.json({
    status: true,
    content: newData,
  });
});

router.post("/usuario/registro", async (req, res) => {
  const passwordEncriptado = bcrypt.hashSync(req.body.password, 10);
  const newData = await prisma.tbl_usuario.create({
    data: {
      email: req.body.email,
      password: passwordEncriptado,
      tipo: 3,
    },
  });
  delete newData.password;
  res.json({
    status: true,
    content: newData,
  });
});

router.get("/usuario/:id", async (req, res) => {
  const data = await prisma.tbl_usuario.findUnique({
    where: {
      idusuario: parseInt(req.params.id),
    },
  });
  if (!data) {
    return res
      .status(404)
      .json({ status: false, error: "No se encontro el usuario" });
  }
  delete data.password;
  res.json({
    status: true,
    content: data,
  });
});

router.put("/usuario/:id",verifyToken, async (req, res) => {
  const data = await prisma.tbl_usuario.update({
    where: {
      idusuario: parseInt(req.params.id),
    },
    data: req.body,
  });
  if (!data) {
    return res
      .status(404)
      .json({ status: false, error: "No se encontro el usuario" });
  }
  delete data.password;
  res.json({
    status: true,
    content: data,
  });
});

router.delete("/usuario/:id", verifyToken, async (req, res) => {
  const data = await prisma.tbl_usuario.delete({
    where: {
      idusuario: parseInt(req.params.id),
    },
  });
  if (!data) {
    return res
      .status(404)
      .json({ status: false, error: "No se encontro el usuario" });
  }
  res.sendStatus(200);
});

router.post("/usuario/login", async (req, res) => {
  const usuario = req.body;
  const passwordEncriptado = bcrypt.hashSync(usuario.password, 10);
  //get by email
  const data = await prisma.tbl_usuario.findUnique({
    where: {
      email: usuario.email,
    },
  });
  if (!data) {
    return res
      .status(404)
      .json({ status: false, error: "No se encontro el usuario" });
  }
  //console.log(data);
  if (await bcrypt.compare(usuario.password, data.password)) {
    const authUsuario = {
        id: data.idusuario,
        email: data.email,
    };
    const token = jwt.sign(authUsuario, config.jwt_secret, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        status: true,
        content: token,
      });
  }else{
    return res.status(401).json({
        status: false,
        content: "datos invalidos",
      });
  }

});

module.exports = router;
