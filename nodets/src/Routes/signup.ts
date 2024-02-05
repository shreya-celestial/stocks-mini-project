import express from "express";
import { signup } from "./Controllers/signup";

const router = express.Router();

router.post('/signup', signup)

export default router