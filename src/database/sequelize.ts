import { Sequelize } from "sequelize";

// Banco relacional via SQLite: não exige servidor de banco rodando à parte.
// Em teste (Jest) usamos ":memory:" para cada execução começar zerada.
const storage =
  process.env.NODE_ENV === "test" ? ":memory:" : "database.sqlite";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage,
  logging: false
});
