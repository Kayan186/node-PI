// app.js
const express = require("express");
const produtoRoutes = require("./routes/produto.routes");

const app = express();

app.use(express.json());
app.use("/produtos", produtoRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
