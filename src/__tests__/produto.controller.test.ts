import request from "supertest";
import { app } from "../app";
import { mensagemDeErro } from "../controllers/produto.controller";
import * as service from "../services/produto.service";

describe("mensagemDeErro", () => {
  it("retorna a mensagem quando é um Error", () => {
    expect(mensagemDeErro(new Error("deu ruim"))).toBe("deu ruim");
  });

  it("retorna mensagem padrão quando não é um Error", () => {
    expect(mensagemDeErro("qualquer coisa")).toBe("Erro desconhecido");
  });
});

// Quando o service falha por algo que não é validação (ex.: banco fora do ar),
// o controller precisa responder 500 em vez de deixar a requisição pendurada.
describe("erros inesperados viram 500", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const falha = new Error("banco indisponível");

  it("GET /produtos", async () => {
    jest.spyOn(service, "listar").mockRejectedValueOnce(falha);

    const resposta = await request(app).get("/produtos");

    expect(resposta.status).toBe(500);
    expect(resposta.body.mensagem).toBe("Erro interno do servidor");
  });

  it("GET /produtos/:id", async () => {
    jest.spyOn(service, "buscarPorId").mockRejectedValueOnce(falha);

    const resposta = await request(app).get("/produtos/1");

    expect(resposta.status).toBe(500);
  });

  it("POST /produtos", async () => {
    jest.spyOn(service, "criar").mockRejectedValueOnce(falha);

    const resposta = await request(app)
      .post("/produtos")
      .send({ nome: "Mouse", preco: 120 });

    expect(resposta.status).toBe(500);
  });

  it("PUT /produtos/:id", async () => {
    jest.spyOn(service, "atualizar").mockRejectedValueOnce(falha);

    const resposta = await request(app)
      .put("/produtos/1")
      .send({ preco: 10 });

    expect(resposta.status).toBe(500);
  });

  it("DELETE /produtos/:id", async () => {
    jest.spyOn(service, "deletar").mockRejectedValueOnce(falha);

    const resposta = await request(app).delete("/produtos/1");

    expect(resposta.status).toBe(500);
  });
});
