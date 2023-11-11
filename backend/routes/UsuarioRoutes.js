import express from "express";

import { register, login, update } from "../controllers/UsuarioController.js";

const UsuarioRouter = express.Router();

UsuarioRouter.post("/login", login);
UsuarioRouter.post("/registrar", register);
UsuarioRouter.post("/atualizar", update);

export default UsuarioRouter;
