import { Router } from "express";

import {
    signUp,
    login,
    findAllUsers,
    findOneUserById,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';

const router = Router()

router.post('/user/signup', signUp)
router.post('/user/login', login)
router.get('/user', findAllUsers)
router.get('/user/:idUser', findOneUserById)
router.put('/user/:idUser', updateUser)
router.delete('/user/:idUser', deleteUser)

export default router;