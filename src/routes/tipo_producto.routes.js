const express = require("express");
const prisma = require("../db");
const router = express.Router();

router.get('/tipo_producto',async(req,res)=>{
    const data = await prisma.tbl_tipo_producto.findMany()
    res.json({
        status:true,
        content:data
    })
})

router.post('/tipo_producto',async(req,res)=>{
    const newData = await prisma.tbl_tipo_producto.create({
        data:req.body
    })
    res.json({
        status:true,
        content:newData
    })
})

router.get("/tipo_producto/:id",async (req,res)=>{
    const data = await prisma.tbl_tipo_producto.findUnique({
        where: {
            idtipoproducto: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el tipo de producto" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.put("/tipo_producto/:id",async (req,res)=>{
    const data = await prisma.tbl_tipo_producto.update({
        where: {
            idtipoproducto: parseInt(req.params.id)
        },
        data:req.body
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el tipo de producto" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.delete("/tipo_producto/:id",async (req,res)=>{
    const data = await prisma.tbl_tipo_producto.delete({
        where: {
            idtipoproducto: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el tipo de producto" });
      }
    res.sendStatus(200)
})

module.exports = router;
