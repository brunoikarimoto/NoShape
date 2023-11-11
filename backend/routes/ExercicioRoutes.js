import express from "express";

import {
  novoExericio,
  editarExercicio,
  deletarExercicio,
  todosExerciciosTreino,
  pegaExercicio,
} from "../controllers/ExercicioController.js";

const ExercicioRouter = express.Router();

ExercicioRouter.get("/pegaExercicio/:id", pegaExercicio);
ExercicioRouter.get("/exerciciosTreino/:id", todosExerciciosTreino);
ExercicioRouter.post("/novoExercicio/:id", novoExericio);
ExercicioRouter.post("/editarExercicio/:id", editarExercicio);
ExercicioRouter.delete("/deletarExercicio/:id", deletarExercicio);

export default ExercicioRouter;
