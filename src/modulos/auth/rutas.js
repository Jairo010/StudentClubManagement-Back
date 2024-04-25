const express = require('express');

const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')

const router = express.Router();

router.post('/createUser', createUser)
router.post('/login', login)
router.post('/getResetToken', getResetToken)
router.post('/resetPassword', resetPassword)

async function createUser(req, res, next){
    try {
        const items = await controlador.createUser(req.body)
        respuesta.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function login(req, res, next){
    try {
        const items = await controlador.login(req.body)
        respuesta.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function getResetToken(req, res, next){
    try {
        const items = await controlador.getResetToken(req.body)
        respuesta.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function resetPassword(req, res, next){
    try {
        const items = await controlador.resetPassword(req.body)
        respuesta.success(req, res, items, 200)
    } catch (error) {
        next(error)
    }
}

module.exports= router