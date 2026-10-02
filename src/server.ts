import { app } from "./app";
import { sequelize } from "./database/sequelize";
import "./database/produto.sequelize-model";

const PORTA = 3000;

async function iniciar(): Promise<void> {
  await sequelize.authenticate();
  await sequelize.sync();

  app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
  });
}

iniciar().catch((erro) => {
  console.error("Falha ao iniciar o servidor:", erro);
  process.exit(1);
});
