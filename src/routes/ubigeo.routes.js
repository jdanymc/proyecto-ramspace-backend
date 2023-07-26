const express = require("express");
const prisma = require("../db");
const router = express.Router();

router.get('/ubigeo',async(req,res)=>{
    const data = await prisma.tbl_ubigeo.findMany()
    res.json({
        status:true,
        content:data
    })
})

router.post('/ubigeo',async(req,res)=>{
    const newData = await prisma.tbl_ubigeo.create({
        data:req.body
    })
    res.json({
        status:true,
        content:newData
    })
})

router.get("/ubigeo/:id",async (req,res)=>{
    const data = await prisma.tbl_ubigeo.findUnique({
        where: {
            idubigeo: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el ubigeo" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.put("/ubigeo/:id",async (req,res)=>{
    const data = await prisma.tbl_ubigeo.update({
        where: {
            idubigeo: parseInt(req.params.id)
        },
        data:req.body
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el ubigeo" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.delete("/ubigeo/:id",async (req,res)=>{
    const data = await prisma.tbl_ubigeo.delete({
        where: {
            idubigeo: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el ubigeo" });
      }
    res.sendStatus(200)
})

module.exports = router;
