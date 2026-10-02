import Produto from "../models/produto.model";
import {
  AtualizarProdutoDados,
  CriarProdutoDados,
  ProdutoRepository
} from "../repositories/produto.repository";
import { ProdutoRepositorySequelize } from "../repositories/produto.repository.sequelize";

// A regra de negócio (Service) depende só da interface ProdutoRepository,
// não do Sequelize diretamente (Dependency Inversion).
const repository: ProdutoRepository = new ProdutoRepositorySequelize();

// Erro de regra de negócio: o controller traduz para 400 (Bad Request).
// Qualquer outro erro (ex.: falha de banco) vira 500.
export class ErroDeValidacao extends Error {}

function converterId(id: string): number | null {
  const numero = Number(id);
  return Number.isInteger(numero) ? numero : null;
}

function nomeValido(nome: unknown): nome is string {
  return typeof nome === "string" && nome.trim() !== "";
}

function precoValido(preco: unknown): preco is number {
  return typeof preco === "number" && Number.isFinite(preco) && preco >= 0;
}

export async function listar(): Promise<Produto[]> {
  return repository.listar();
}

export async function buscarPorId(id: string): Promise<Produto | null> {
  const idNumerico = converterId(id);
  if (idNumerico === null) return null;

  return repository.buscarPorId(idNumerico);
}

export async function criar(dados: CriarProdutoDados): Promise<Produto> {
  if (!dados || dados.nome == null || dados.preco == null) {
    throw new ErroDeValidacao("nome e preco são obrigatórios");
  }
  if (!nomeValido(dados.nome)) {
    throw new ErroDeValidacao("nome deve ser um texto não vazio");
  }
  if (!precoValido(dados.preco)) {
    throw new ErroDeValidacao("preco deve ser um número maior ou igual a zero");
  }

  return repository.criar({ nome: dados.nome.trim(), preco: dados.preco });
}

export async function atualizar(
  id: string,
  dados: AtualizarProdutoDados
): Promise<Produto | null> {
  if (!dados || (dados.nome === undefined && dados.preco === undefined)) {
    throw new ErroDeValidacao("informe nome e/ou preco para atualizar");
  }
  if (dados.nome !== undefined && !nomeValido(dados.nome)) {
    throw new ErroDeValidacao("nome deve ser um texto não vazio");
  }
  if (dados.preco !== undefined && !precoValido(dados.preco)) {
    throw new ErroDeValidacao("preco deve ser um número maior ou igual a zero");
  }

  const idNumerico = converterId(id);
  if (idNumerico === null) return null;

  return repository.atualizar(idNumerico, {
    nome: dados.nome?.trim(),
    preco: dados.preco
  });
}

export async function deletar(id: string): Promise<boolean> {
  const idNumerico = converterId(id);
  if (idNumerico === null) return false;

  return repository.deletar(idNumerico);
}
