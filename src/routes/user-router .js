import { Router } from "express";
import UserController from "../controller/UserController.js";

const router = Router();

router.get("/", UserController.index);
router.get("/create", UserController.create);
router.get("/update/:id", UserController.update);
router.get("/delete/:id", UserController.delete);

export default router;
