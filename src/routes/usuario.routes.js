const express = require("express");
const prisma = require("../db");
const router = express.Router();

router.get('/usuario',async(req,res)=>{
    const data = await prisma.tbl_usuario.findMany()
    res.json({
        status:true,
        content:data
    })
})

router.post('/usuario',async(req,res)=>{
    const newData = await prisma.tbl_usuario.create({
        data:req.body
    })
    res.json({
        status:true,
        content:newData
    })
})

router.get("/usuario/:id",async (req,res)=>{
    const data = await prisma.tbl_usuario.findUnique({
        where: {
            idusuario: parseInt(req.params.id)
        }
    })
    res.json({
        status:true,
        content:data
    })
})

router.put("/usuario/:id",async (req,res)=>{
    const data = await prisma.tbl_usuario.update({
        where: {
            idusuario: parseInt(req.params.id)
        },
        data:req.body
    })
    res.json({
        status:true,
        content:data
    })
})

router.delete("/usuario/:id",async (req,res)=>{
    const data = await prisma.tbl_usuario.delete({
        where: {
            idusuario: parseInt(req.params.id)
        }
    })
    res.sendStatus(200)
})

module.exports = router;
