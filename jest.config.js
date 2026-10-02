/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // Cobertura medida em cima do CRUD de produtos
  // (routes -> controller -> service -> repository -> model).
  collectCoverageFrom: [
    "src/routes/produto.routes.ts",
    "src/controllers/produto.controller.ts",
    "src/services/produto.service.ts",
    "src/repositories/produto.repository.sequelize.ts",
    "src/models/produto.model.ts"
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90
    }
  }
};
