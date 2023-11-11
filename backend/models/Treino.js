import mongoose from "mongoose";

const { Schema } = mongoose;

const treinoSchema = new Schema(
  {
    nome: String,
    usuarioId: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Treino = mongoose.model("Treino", treinoSchema);

export default Treino;
