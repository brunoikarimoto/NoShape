import mongoose from "mongoose";

const { Schema } = mongoose;

const exercicioSchema = new Schema({
  nome: String,
  repeticoes: Number,
  series: Number,
  carga: Number,
  detalhes: String,
  treinoId: mongoose.ObjectId,
});

const Exercicio = mongoose.model("Exercicio", exercicioSchema);

export default Exercicio;
