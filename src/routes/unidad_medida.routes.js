const express = require("express");
const prisma = require("../db");
const router = express.Router();

router.get('/unidad_medida',async(req,res)=>{
    const data = await prisma.tbl_unidad_medida.findMany()
    res.json({
        status:true,
        content:data
    })
})

router.post('/unidad_medida',async(req,res)=>{
    const newData = await prisma.tbl_unidad_medida.create({
        data:req.body
    })
    res.json({
        status:true,
        content:newData
    })
})

router.get("/unidad_medida/:id",async (req,res)=>{
    const data = await prisma.tbl_unidad_medida.findUnique({
        where: {
            idunidadmedida: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro la unidad de medida" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.put("/unidad_medida/:id",async (req,res)=>{
    const data = await prisma.tbl_unidad_medida.update({
        where: {
            idunidadmedida: parseInt(req.params.id)
        },
        data:req.body
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro la unidad de medida" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.delete("/unidad_medida/:id",async (req,res)=>{
    const data = await prisma.tbl_unidad_medida.delete({
        where: {
            idunidadmedida: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro la unidad de medida" });
      }
    res.sendStatus(200)
})

module.exports = router;
