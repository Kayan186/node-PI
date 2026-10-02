interface ProdutoProps {
  id: number;
  nome: string;
  preco: number;
}

export default class Produto {
  id: number;
  nome: string;
  preco: number;

  constructor({ id, nome, preco }: ProdutoProps) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
  }

  estaEmPromocao(): boolean {
    return this.preco < 100;
  }
}
