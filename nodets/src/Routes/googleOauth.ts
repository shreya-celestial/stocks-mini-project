import express from "express";
import { googleRequest } from "./Controllers/oauth";
const router = express.Router();

router.get('/', googleRequest)

export default router
