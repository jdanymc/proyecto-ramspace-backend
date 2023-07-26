const express = require("express");
const prisma = require("../db");
const router = express.Router();

router.get('/marca',async(req,res)=>{
    const data = await prisma.tbl_marca.findMany()
    res.json({
        status:true,
        content:data
    })
})

router.post('/marca',async(req,res)=>{
    const newData = await prisma.tbl_marca.create({
        data:req.body
    })
    res.json({
        status:true,
        content:newData
    })
})

router.get("/marca/:id",async (req,res)=>{
    const data = await prisma.tbl_marca.findUnique({
        where: {
            idmarca: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro la marca" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.put("/marca/:id",async (req,res)=>{
    const data = await prisma.tbl_marca.update({
        where: {
            idmarca: parseInt(req.params.id)
        },
        data:req.body
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro la marca" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.delete("/marca/:id",async (req,res)=>{
    const data = await prisma.tbl_marca.delete({
        where: {
            idmarca: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro la marca" });
      }
    res.sendStatus(200)
})

module.exports = router;
