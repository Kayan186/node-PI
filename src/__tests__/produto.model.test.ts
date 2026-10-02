import Produto from "../models/produto.model";

describe("Produto (model)", () => {
  it("guarda id, nome e preço informados", () => {
    const produto = new Produto({ id: 1, nome: "Caneta", preco: 5 });

    expect(produto).toMatchObject({ id: 1, nome: "Caneta", preco: 5 });
  });

  it("estaEmPromocao é true quando o preço é menor que 100", () => {
    const produto = new Produto({ id: 1, nome: "Caneta", preco: 5 });
    expect(produto.estaEmPromocao()).toBe(true);
  });

  it("estaEmPromocao é false quando o preço é 100 ou mais", () => {
    const produto = new Produto({ id: 2, nome: "Monitor", preco: 900 });
    expect(produto.estaEmPromocao()).toBe(false);
  });
});
