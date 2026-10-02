import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "./sequelize";

interface ProdutoAttributes {
  id: number;
  nome: string;
  preco: number;
}

type ProdutoCreationAttributes = Optional<ProdutoAttributes, "id">;

export class ProdutoSequelizeModel
  extends Model<ProdutoAttributes, ProdutoCreationAttributes>
  implements ProdutoAttributes
{
  declare id: number;
  declare nome: string;
  declare preco: number;
}

ProdutoSequelizeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Produto",
    tableName: "produtos",
    timestamps: false
  }
);
