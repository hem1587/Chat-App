import express from "express"
import { login,signup } from "../controllers/auth.controller.js";

const router=express.Router();

router.get("/login",(req,res)=>{
    res.send("Login Routes")
})

router.get("/login",login)
router.get("/signup",signup);
// router.get("logout",logout)

export default router