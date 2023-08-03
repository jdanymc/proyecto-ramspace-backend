const express = require("express");
const {prisma,verifyToken} = require("../db");
const router = express.Router();

router.get('/articulo_imagen',async(req,res)=>{
    const data = await prisma.tbl_articulo_imagen.findMany()
    res.json({
        status:true,
        content:data
    })
})

router.post('/articulo_imagen',verifyToken,async(req,res)=>{
    const newData = await prisma.tbl_articulo_imagen.create({
        data:req.body
    })
    res.json({
        status:true,
        content:newData
    })
})

router.get("/articulo_imagen/:id",async (req,res)=>{
    const data = await prisma.tbl_articulo_imagen.findUnique({
        where: {
            idarticuloimagen: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro la imagen" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.put("/articulo_imagen/:id",verifyToken,async (req,res)=>{
    const data = await prisma.tbl_articulo_imagen.update({
        where: {
            idarticuloimagen: parseInt(req.params.id)
        },
        data:req.body
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro la imagen" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.delete("/articulo_imagen/:id",verifyToken,async (req,res)=>{
    const data = await prisma.tbl_articulo_imagen.delete({
        where: {
            idarticuloimagen: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro la imagen" });
      }
    res.sendStatus(200)
})

module.exports = router;
