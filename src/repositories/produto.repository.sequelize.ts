import Produto from "../models/produto.model";
import { ProdutoSequelizeModel } from "../database/produto.sequelize-model";
import {
  AtualizarProdutoDados,
  CriarProdutoDados,
  ProdutoRepository
} from "./produto.repository";

function paraDominio(registro: ProdutoSequelizeModel): Produto {
  return new Produto({
    id: registro.id,
    nome: registro.nome,
    preco: registro.preco
  });
}

export class ProdutoRepositorySequelize implements ProdutoRepository {
  async listar(): Promise<Produto[]> {
    const registros = await ProdutoSequelizeModel.findAll();
    return registros.map(paraDominio);
  }

  async buscarPorId(id: number): Promise<Produto | null> {
    const registro = await ProdutoSequelizeModel.findByPk(id);
    return registro ? paraDominio(registro) : null;
  }

  async criar(dados: CriarProdutoDados): Promise<Produto> {
    const registro = await ProdutoSequelizeModel.create({
      nome: dados.nome,
      preco: dados.preco
    });
    return paraDominio(registro);
  }

  async atualizar(
    id: number,
    dados: AtualizarProdutoDados
  ): Promise<Produto | null> {
    const registro = await ProdutoSequelizeModel.findByPk(id);
    if (!registro) return null;

    if (dados.nome !== undefined) registro.nome = dados.nome;
    if (dados.preco !== undefined) registro.preco = dados.preco;
    await registro.save();

    return paraDominio(registro);
  }

  async deletar(id: number): Promise<boolean> {
    const linhasApagadas = await ProdutoSequelizeModel.destroy({
      where: { id }
    });
    return linhasApagadas > 0;
  }
}
