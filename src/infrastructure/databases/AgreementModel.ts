import * as Sequelize from "sequelize";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class AgreementModel extends Model<
  InferAttributes<AgreementModel>,
  InferCreationAttributes<AgreementModel>
> {

  declare id?: string;
  declare approver: string;
  declare recipient: string;
  declare fileName: string;

  static initModel(sequelize: Sequelize.Sequelize) {
    return AgreementModel.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },

        fileName: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        approver: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        recipient: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "TRN_Agreements",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },

          {
            name: "approver",
            using: "BTREE",
            fields: [{ name: "approver" }],
          },
          {
            name: "recipient",
            using: "BTREE",
            fields: [{ name: "recipient" }],
          },
          {
            name: "fileName",
            using: "BTREE",
            fields: [{ name: "fileName" }],
          },
        ],
      }
    );
  }
}
