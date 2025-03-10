import { Router } from "express";

import {
    signUp,
    login,
    logout,
    verifyEmail,
    updateUser,
    deleteUser,
    forgotPassword,
    resetPassword
} from '../controllers/user.controller.js';

const router = Router()

router.post('/user/signup', signUp)
router.post('/user/login', login)
router.post('/user/logout', logout)
router.post('/user/verify-email', verifyEmail)
router.post('/user/forgot-password', forgotPassword)
router.post('/user/reset-password/:token', resetPassword)
router.put('/user/:idUser', updateUser)
router.delete('/user/:idUser', deleteUser)

export default router;