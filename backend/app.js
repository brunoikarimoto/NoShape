import "dotenv/config";

import express from "express";
import cors from "cors";

import "./config/db.js";
import router from "./routes/Router.js";

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
