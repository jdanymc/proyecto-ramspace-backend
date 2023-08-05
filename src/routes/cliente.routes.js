const express = require("express");
const {prisma,verifyToken} = require("../db");
const router = express.Router();

router.get('/cliente',async(req,res)=>{
    const data = await prisma.tbl_cliente.findMany({
        include:{
            tbl_usuario:true
        }
    })
    res.json({
        status:true,
        content:data
    })
})

router.post('/cliente',verifyToken,async(req,res)=>{
    const newData = await prisma.tbl_cliente.create({
        data:req.body
    })
    res.json({
        status:true,
        content:newData
    })
})

router.get("/cliente/:id",verifyToken,async (req,res)=>{
    const data = await prisma.tbl_cliente.findUnique({
        where: {
            idcliente: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el cliente" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.put("/cliente/:id",verifyToken,async (req,res)=>{
    const data = await prisma.tbl_cliente.update({
        where: {
            idcliente: parseInt(req.params.id)
        },
        data:req.body
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el cliente" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.delete("/cliente/:id",verifyToken,async (req,res)=>{
    const data = await prisma.tbl_cliente.delete({
        where: {
            idcliente: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el cliente" });
      }
    res.sendStatus(200)
})

module.exports = router;
