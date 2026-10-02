import express from "express";
import produtoRoutes from "./routes/produto.routes";

export const app = express();

app.use(express.json());

app.use("/produtos", produtoRoutes);

app.get("/", (req, res) => {
  res.send("API está rodando perfeitamente! Acesse /produtos");
});
