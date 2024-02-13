import express from "express";
import { gdata, login, signup, glogout, checkUser, resetPassword, addDevice, verifyPass } from "./Controllers/signup";
import { clientRequest } from "./Controllers/oauth";

const router = express.Router();

router.post('/signup', signup)
router.get('/login', login)
router.get('/googleRequest', clientRequest)
router.get('/getmygoogledata', gdata)
router.get('/logoutgoogle/:id', glogout)
router.put('/checkUser', checkUser)
router.put('/password', resetPassword)
router.put('/device', addDevice)
router.get('/checkPass', verifyPass)

export default router