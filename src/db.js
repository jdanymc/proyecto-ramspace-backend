const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {verifyToken} = require('./middlewares/auth.handler')

module.exports = {prisma,verifyToken};