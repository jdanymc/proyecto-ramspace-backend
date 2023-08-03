const express = require("express");
const {prisma,verifyToken} = require("../db");
const router = express.Router();

router.get('/pedido_descuento',async(req,res)=>{
    const data = await prisma.tbl_pedido_descuento.findMany()
    res.json({
        status:true,
        content:data
    })
})

router.post('/pedido_descuento',verifyToken,async(req,res)=>{
    const newData = await prisma.tbl_pedido_descuento.create({
        data:req.body
    })
    res.json({
        status:true,
        content:newData
    })
})

router.get("/pedido_descuento/:id",async (req,res)=>{
    const data = await prisma.tbl_pedido_descuento.findUnique({
        where: {
            idpedidodescuento: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el descuento de pedido" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.put("/pedido_descuento/:id",verifyToken,async (req,res)=>{
    const data = await prisma.tbl_pedido_descuento.update({
        where: {
            idpedidodescuento: parseInt(req.params.id)
        },
        data:req.body
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el descuento de pedido" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.delete("/pedido_descuento/:id",verifyToken,async (req,res)=>{
    const data = await prisma.tbl_pedido_descuento.delete({
        where: {
            idpedidodescuento: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el descuento de pedido" });
      }
    res.sendStatus(200)
})

module.exports = router;
