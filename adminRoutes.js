import express from "express";
import userController from "./adminController.js";
const router = express.Router();

//define function logic in controller
router.route("/").get(userController.getAllUsers);

export default router;  