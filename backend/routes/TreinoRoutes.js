import express from "express";

import {
  novoTreino,
  verTodosTreinos,
  editarTreino,
  deletarTreino,
  treinoPorId,
} from "../controllers/TreinoController.js";

const TreinoRouter = express.Router();

TreinoRouter.get("/todosTreinos/:id", verTodosTreinos);
TreinoRouter.get("/treino/:id", treinoPorId);
TreinoRouter.post("/editarTreino/:id", editarTreino);
TreinoRouter.post("/novoTreino/:id", novoTreino);
TreinoRouter.delete("/deletarTreino/:id", deletarTreino);

export default TreinoRouter;
