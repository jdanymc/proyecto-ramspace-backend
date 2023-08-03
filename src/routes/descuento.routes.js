const express = require("express");
const {prisma,verifyToken} = require("../db");
const router = express.Router();

router.get('/descuento',async(req,res)=>{
    const data = await prisma.tbl_descuento.findMany()
    res.json({
        status:true,
        content:data
    })
})

router.post('/descuento',verifyToken,async(req,res)=>{
    const newData = await prisma.tbl_descuento.create({
        data:req.body
    })
    res.json({
        status:true,
        content:newData
    })
})

router.get("/descuento/:id",async (req,res)=>{
    const data = await prisma.tbl_descuento.findUnique({
        where: {
            iddescuento: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el descuento" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.put("/descuento/:id",verifyToken,async (req,res)=>{
    const data = await prisma.tbl_descuento.update({
        where: {
            iddescuento: parseInt(req.params.id)
        },
        data:req.body
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el descuento" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.delete("/descuento/:id",verifyToken,async (req,res)=>{
    const data = await prisma.tbl_descuento.delete({
        where: {
            iddescuento: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el descuento" });
      }
    res.sendStatus(200)
})

module.exports = router;
