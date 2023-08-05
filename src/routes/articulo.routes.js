const express = require("express");
const {prisma,verifyToken} = require("../db");
const router = express.Router();

router.get('/articulo',async(req,res)=>{
    const data = await prisma.tbl_articulo.findMany({
        include:{
            tbl_articulo_imagen:true,
            tbl_marca:true,
            tbl_categoria:true,
            tbl_tipo_producto:true,
            tbl_unidad_medida:true
        }
    })
    res.json({
        status:true,
        content:data
    })
})

router.post('/articulo',verifyToken,async(req,res)=>{
    const newData = await prisma.tbl_articulo.create({
        data:req.body
    })
    res.json({
        status:true,
        content:newData
    })
})

router.post('/articulo/busqueda',async(req,res)=>{
    const data = await prisma.tbl_articulo.findMany({
        where: {
            OR:[
                {
                    nombre:{
                        contains:req.body.busqueda
                    }
                },
                {
                    descripcion:{
                        contains:req.body.busqueda
                    }
                }
            ]
        },
        include:{
            tbl_articulo_imagen:true,
            tbl_marca:true,
            tbl_categoria:true,
            tbl_tipo_producto:true,
            tbl_unidad_medida:true
        }
      });
      
      if (!data || data.length === 0) {
          return res
          .status(404)
          .json({ status: false, error: "No se encontraron productos" });
        }
      
      res.json({
          status:true,
          content:data
      })
})

router.get("/articulo/:id",async (req,res)=>{
    const data = await prisma.tbl_articulo.findUnique({
        where: {
            idarticulo: parseInt(req.params.id)
        },
        include:{
            tbl_articulo_imagen:true,
            tbl_marca:true,
            tbl_categoria:true,
            tbl_tipo_producto:true,
            tbl_unidad_medida:true
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el artículo" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.get("/articulo/categoria/:id",async (req,res)=>{
    const data = await prisma.tbl_articulo.findMany({
        where: {
            idcategoria: parseInt(req.params.id)
        },
        include:{
            tbl_articulo_imagen:true,
            tbl_marca:true,
            tbl_categoria:true,
            tbl_tipo_producto:true,
            tbl_unidad_medida:true
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el artículo" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.get("/articulo/imagenes/:id",async (req,res)=>{
    const data = await prisma.tbl_articulo_imagen.findMany({
        where: {
            idarticulo: parseInt(req.params.id)
        }      
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el artículo" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.put("/articulo/:id",verifyToken,async (req,res)=>{
    const data = await prisma.tbl_articulo.update({
        where: {
            idarticulo: parseInt(req.params.id)
        },
        data:req.body
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el artículo" });
      }
    res.json({
        status:true,
        content:data
    })
})

router.delete("/articulo/:id",verifyToken,async (req,res)=>{
    const data = await prisma.tbl_articulo.delete({
        where: {
            idarticulo: parseInt(req.params.id)
        }
    })
    if (!data) {
        return res
          .status(404)
          .json({ status: false, error: "No se encontro el artículo" });
      }
    res.sendStatus(200)
})

module.exports = router;
