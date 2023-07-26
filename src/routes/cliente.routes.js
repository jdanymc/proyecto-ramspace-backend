const express = require("express");
const prisma = require("../db");
const router = express.Router();

router.get('/cliente',async(req,res)=>{
    const data = await prisma.tbl_cliente.findMany()
    res.json({
        status:true,
        content:data
    })
})

router.post('/cliente',async(req,res)=>{
    const newData = await prisma.tbl_cliente.create({
        data:req.body
    })
    res.json({
        status:true,
        content:newData
    })
})

router.get("/cliente/:id",async (req,res)=>{
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

router.put("/cliente/:id",async (req,res)=>{
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

router.delete("/cliente/:id",async (req,res)=>{
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
