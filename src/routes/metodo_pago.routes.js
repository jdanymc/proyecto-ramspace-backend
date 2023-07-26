const express = require("express");
const prisma = require("../db");
const router = express.Router();

router.get('/metodo_pago',async(req,res)=>{
    const data = await prisma.tbl_metodo_pago.findMany()
    res.json({
        status:true,
        content:data
    })
})

router.post('/metodo_pago',async(req,res)=>{
    const newData = await prisma.tbl_metodo_pago.create({
        data:req.body
    })
    res.json({
        status:true,
        content:newData
    })
})

router.get("/metodo_pago/:id",async (req,res)=>{
    const data = await prisma.tbl_metodo_pago.findUnique({
        where: {
            idmetodopago: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el metodo de pago" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.put("/metodo_pago/:id",async (req,res)=>{
    const data = await prisma.tbl_metodo_pago.update({
        where: {
            idmetodopago: parseInt(req.params.id)
        },
        data:req.body
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el metodo de pago" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.delete("/metodo_pago/:id",async (req,res)=>{
    const data = await prisma.tbl_metodo_pago.delete({
        where: {
            idmetodopago: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el metodo de pago" });
      }
    res.sendStatus(200)
})

module.exports = router;
