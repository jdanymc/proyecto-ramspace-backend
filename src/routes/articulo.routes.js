const express = require("express");
const prisma = require("../db");
const router = express.Router();

router.get('/articulo',async(req,res)=>{
    const data = await prisma.tbl_articulo.findMany()
    res.json({
        status:true,
        content:data
    })
})

router.post('/articulo',async(req,res)=>{
    const newData = await prisma.tbl_articulo.create({
        data:req.body
    })
    res.json({
        status:true,
        content:newData
    })
})

router.get("/articulo/:id",async (req,res)=>{
    const data = await prisma.tbl_articulo.findUnique({
        where: {
            idarticulo: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el artículo" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.put("/articulo/:id",async (req,res)=>{
    const data = await prisma.tbl_articulo.update({
        where: {
            idarticulo: parseInt(req.params.id)
        },
        data:req.body
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el artículo" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.delete("/articulo/:id",async (req,res)=>{
    const data = await prisma.tbl_articulo.delete({
        where: {
            idarticulo: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el artículo" });
      }
    res.sendStatus(200)
})

module.exports = router;
