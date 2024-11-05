import type { Sequelize } from "sequelize";
import { UserPersonalInformationModel } from "./UserPersonalInformation";
import type {
  UserPersonalInformationModelAttributes,
  UserPersonalInformationModelCreationAttributes,
} from "./UserPersonalInformation";
import { UserModel } from "./Users";
import type { UserModelAttributes, UserModelCreationAttributes } from "./Users";
import { AgreementModel } from "./AgreementModel";

export { UserPersonalInformationModel, UserModel, AgreementModel };

export type {
  UserPersonalInformationModelAttributes,
  UserPersonalInformationModelCreationAttributes,
  UserModelAttributes,
  UserModelCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const UserPersonalInformationModelInstance =
    UserPersonalInformationModel.initModel(sequelize);
  const UsersModelInstance = UserModel.initModel(sequelize);
  const AgreementModelInstance = AgreementModel.initModel(sequelize);

  UsersModelInstance.hasOne(UserPersonalInformationModel, {
    foreignKey: "userId",
  });
  UserPersonalInformationModelInstance.belongsTo(UserModel, {
    foreignKey: "userId",
  });

  return {
    // TODO: refactor UserPersonalInformationModel and UserModel
    UserPersonalInformationModel: UserPersonalInformationModelInstance,
    UserModel: UsersModelInstance,
    AgreementModel: AgreementModelInstance,
  };
}
