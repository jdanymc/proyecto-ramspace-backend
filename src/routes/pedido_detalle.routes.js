const express = require("express");
const prisma = require("../db");
const router = express.Router();

router.get('/pedido_detalle',async(req,res)=>{
    const data = await prisma.tbl_detalle_pedido.findMany()
    res.json({
        status:true,
        content:data
    })
})

router.post('/pedido_detalle',async(req,res)=>{
    const newData = await prisma.tbl_detalle_pedido.create({
        data:req.body
    })
    res.json({
        status:true,
        content:newData
    })
})

router.get("/pedido_detalle/:id",async (req,res)=>{
    const data = await prisma.tbl_detalle_pedido.findUnique({
        where: {
            iddetallepedido: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el detalle de pedido" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.put("/pedido_detalle/:id",async (req,res)=>{
    const data = await prisma.tbl_detalle_pedido.update({
        where: {
            iddetallepedido: parseInt(req.params.id)
        },
        data:req.body
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el detalle de pedido" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.delete("/pedido_detalle/:id",async (req,res)=>{
    const data = await prisma.tbl_detalle_pedido.delete({
        where: {
            iddetallepedido: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el detalle de pedido" });
      }
    res.sendStatus(200)
})

module.exports = router;
