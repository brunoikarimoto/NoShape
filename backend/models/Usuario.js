import mongoose from "mongoose";

const { Schema } = mongoose;

const usuarioSchema = new Schema({
  nome: String,
  email: String,
  senha: String,
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
