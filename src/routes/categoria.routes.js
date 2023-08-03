const express = require("express");
const {prisma,verifyToken} = require("../db");
const router = express.Router();

router.get("/categoria", async (req, res) => {
  const data = await prisma.tbl_categoria.findMany();
  res.json({
    status: true,
    content: data,
  });
});

router.post("/categoria", verifyToken,async (req, res) => {
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
    include:{
      tbl_articulo:true
    }

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

router.put("/categoria/:id", verifyToken,async (req, res) => {
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

router.delete("/categoria/:id",verifyToken, async (req, res) => {
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

// obtiene categorias por categoria padre
router.get("/categoria/padre/:id", async (req, res) => {
  const data = await prisma.tbl_categoria.findMany({
    where: {
           idcategoriapadre:parseInt(req.params.id),
    },
    include:{
      tbl_articulo:true
    }

  });
  
  if (!data || data.length === 0) {
      return res
      .status(404)
      .json({ status: false, error: "No se encontraron más categorias" });
    }
  
  res.json({
      status:true,
      content:data
  })
});

// obtiene arbol completo de categorias
router.get("/categoria-all/", async (req, res) => {
  const data = await prisma.tbl_categoria.findMany({
    where:{
      idcategoriapadre:null
    },
    include: {
      tbl_categoria: true,
      other_tbl_categoria: {
        include:{
          other_tbl_categoria: true,
        }
      },
     
    }
  });
  
  if (!data || data.length === 0) {
      return res
      .status(404)
      .json({ status: false, error: "No se encontraron más categorias" });
    }
  
  res.json({
      status:true,
      content:data
  })
});


module.exports = router;
