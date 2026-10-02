import Produto from "../models/produto.model";

export interface CriarProdutoDados {
  nome: string;
  preco: number;
}

export interface AtualizarProdutoDados {
  nome?: string;
  preco?: number;
}

export interface ProdutoRepository {
  listar(): Promise<Produto[]>;
  buscarPorId(id: number): Promise<Produto | null>;
  criar(dados: CriarProdutoDados): Promise<Produto>;
  atualizar(id: number, dados: AtualizarProdutoDados): Promise<Produto | null>;
  deletar(id: number): Promise<boolean>;
}
