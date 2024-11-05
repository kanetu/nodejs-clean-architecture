import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UserPersonalInformationModelAttributes {
  userId: number;
  personalInfo_title?: number;
  personalInfo_fullName?: string;
  personalInfo_initials?: string;
  personalInfo_surname?: string;
  personalInfo_maritalStatus?: number;
  personalInfo_bloodGroup?: number;
  personalInfo_birthday?: Date;
  personalInfo_expatriate?: number;
  personalInfo_nicNum?: string;
  personalInfo_nicImage?: string;
  personalInfo_drivingLicenseNum?: string;
  personalInfo_drivingLicenseImage?: string;
  personalInfo_passportNum?: string;
  personalInfo_passportImage?: string;
  personalInfo_passportExpDate?: Date;
  personalInfo_dependantsCount?: number;
  personalInfo_childrenCount?: number;
  personalInfo_homeTown?: string;
  personalInfo_zipCode?: string;
}

export type UserPersonalInformationModelPk = 'userId';
export type UserPersonalInformationModelId =
  UserPersonalInformationModel[UserPersonalInformationModelPk];
export type UserPersonalInformationModelOptionalAttributes =
  | 'personalInfo_title'
  | 'personalInfo_fullName'
  | 'personalInfo_initials'
  | 'personalInfo_surname'
  | 'personalInfo_maritalStatus'
  | 'personalInfo_bloodGroup'
  | 'personalInfo_birthday'
  | 'personalInfo_expatriate'
  | 'personalInfo_nicNum'
  | 'personalInfo_nicImage'
  | 'personalInfo_drivingLicenseNum'
  | 'personalInfo_drivingLicenseImage'
  | 'personalInfo_passportNum'
  | 'personalInfo_passportImage'
  | 'personalInfo_passportExpDate'
  | 'personalInfo_dependantsCount'
  | 'personalInfo_childrenCount'
  | 'personalInfo_homeTown'
  | 'personalInfo_zipCode';
export type UserPersonalInformationModelCreationAttributes = Optional<
  UserPersonalInformationModelAttributes,
  UserPersonalInformationModelOptionalAttributes
>;

export class UserPersonalInformationModel
  extends Model<
    UserPersonalInformationModelAttributes,
    UserPersonalInformationModelCreationAttributes
  >
  implements UserPersonalInformationModelAttributes
{
  userId!: number;
  personalInfo_title?: number;
  personalInfo_fullName?: string;
  personalInfo_initials?: string;
  personalInfo_surname?: string;
  personalInfo_maritalStatus?: number;
  personalInfo_bloodGroup?: number;
  personalInfo_birthday?: Date;
  personalInfo_expatriate?: number;
  personalInfo_nicNum?: string;
  personalInfo_nicImage?: string;
  personalInfo_drivingLicenseNum?: string;
  personalInfo_drivingLicenseImage?: string;
  personalInfo_passportNum?: string;
  personalInfo_passportImage?: string;
  personalInfo_passportExpDate?: Date;
  personalInfo_dependantsCount?: number;
  personalInfo_childrenCount?: number;
  personalInfo_homeTown?: string;
  personalInfo_zipCode?: string;

  static initModel(
    sequelize: Sequelize.Sequelize
  ): typeof UserPersonalInformationModel {
    return UserPersonalInformationModel.init(
      {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        personalInfo_title: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        personalInfo_fullName: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        personalInfo_initials: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        personalInfo_surname: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        personalInfo_maritalStatus: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        personalInfo_bloodGroup: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        personalInfo_birthday: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        personalInfo_expatriate: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: 0,
        },
        personalInfo_nicNum: {
          type: DataTypes.STRING(12),
          allowNull: true,
        },
        personalInfo_nicImage: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        personalInfo_drivingLicenseNum: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        personalInfo_drivingLicenseImage: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        personalInfo_passportNum: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        personalInfo_passportImage: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        personalInfo_passportExpDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        personalInfo_dependantsCount: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        personalInfo_childrenCount: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        personalInfo_homeTown: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        personalInfo_zipCode: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'TRN_UserPersonalInformation',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'userId' }],
          },
        ],
      }
    );
  }
}
