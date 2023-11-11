import express from "express";

import UsuarioRouter from "./UsuarioRoutes.js";
import TreinoRouter from "./TreinoRoutes.js";
import ExercicioRouter from "./ExercicioRoutes.js";

const router = express.Router();

router.use("/api/exercicio", ExercicioRouter);
router.use("/api/usuario", UsuarioRouter);
router.use("/api/treino", TreinoRouter);

router.get("/", (req, res) => {
  res.send("API FUNCIONANDO");
});

export default router;
