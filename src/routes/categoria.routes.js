const express = require("express");
const prisma = require("../db");
const router = express.Router();

router.get("/categoria", async (req, res) => {
  const data = await prisma.tbl_categoria.findMany();
  res.json({
    status: true,
    content: data,
  });
});

router.post("/categoria", async (req, res) => {
  const newData = await prisma.tbl_categoria.create({
    data: req.body,
  });
  res.json({
    status: true,
    content: newData,
  });
});

router.get("/categoria/:id", async (req, res) => {
  const data = await prisma.tbl_categoria.findUnique({
    where: {
      idcategoria: parseInt(req.params.id),
    },
  });

  if (!data) {
    return res
      .status(404)
      .json({ status: false, error: "No se encontro la categoria" });
  }

  res.json({
    status: true,
    content: data,
  });
});

router.put("/categoria/:id", async (req, res) => {
  const data = await prisma.tbl_categoria.update({
    where: {
      idcategoria: parseInt(req.params.id),
    },
    data: req.body,
  });

  if (!data) {
    return res
      .status(404)
      .json({ status: false, error: "No se encontro la categoria" });
  }
  res.json({
    status: true,
    content: data,
  });
});

router.delete("/categoria/:id", async (req, res) => {
  const data = await prisma.tbl_categoria.delete({
    where: {
      idcategoria: parseInt(req.params.id),
    },
  });
  if (!data) {
    return res
      .status(404)
      .json({ status: false, error: "No se encontro la categoria" });
  }
  res.sendStatus(200);
});

module.exports = router;
