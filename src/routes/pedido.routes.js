const express = require("express");
const {prisma,verifyToken} = require("../db");
const router = express.Router();

router.get('/pedido',async(req,res)=>{
    const data = await prisma.tbl_pedido.findMany()
    res.json({
        status:true,
        content:data
    })
})

router.post('/pedido',verifyToken,async(req,res)=>{
    const newData = await prisma.tbl_pedido.create({
        data:req.body
    })
    res.json({
        status:true,
        content:newData
    })
})

router.get("/pedido/:id",async (req,res)=>{
    const data = await prisma.tbl_pedido.findUnique({
        where: {
            idpedido: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el pedido" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.put("/pedido/:id",verifyToken,async (req,res)=>{
    const data = await prisma.tbl_pedido.update({
        where: {
            idpedido: parseInt(req.params.id)
        },
        data:req.body
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el pedido" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.delete("/pedido/:id",verifyToken,async (req,res)=>{
    const data = await prisma.tbl_pedido.delete({
        where: {
            idpedido: parseInt(req.params.id)
        }
    })
    res.sendStatus(200)
})

module.exports = router;
