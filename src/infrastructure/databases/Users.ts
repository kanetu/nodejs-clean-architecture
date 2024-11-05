import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UserModelAttributes {
  id: number;
  employeeNumber: number;
  firstName?: string;
  lastName?: string;
  gender?: number;
  email?: string;
  userProfileImage?: string;
  password?: string;
  jiraKey?: string;
  jiraAccountId?: string;
  jiraApiToken?: string;
  employmentType?: number;
  companyJoinedDate?: string;
  probationStartDate?: string;
  probationEndDate?: string;
  confirmationDate?: string;
  teamJoinedDate?: string;
  teamId: number;
  teamId_Secondary?: number;
  functionalTeamId?: number;
  functionalTeamId_Secondary?: number;
  teamId_DU?: number;
  userId_DUH: number;
  designationId?: number;
  departmentId?: number;
  designationAppointDate?: string;
  userId_Supervisor?: number;
  bitbucketUsername?: string;
  atlassianToken?: string;
  isActive: string;
  activationCode: string;
  permissionLevel?: number;
  lastLogin?: Date;
  privAdmin: string;
  countryId?: number;
  resignedDate?: string;
  isResigned?: number;
  dontSync?: number;
  createdAt?: Date;
  updatedAt?: Date;
  updatedBy?: number;
  passwordExpirationDate?: string;
  credentialMailSent?: number;
}

export type UserModelPk = "id";
export type UserModelId = UserModel[UserModelPk];
export type UserModelOptionalAttributes = "id" | "firstName" | "lastName" | "gender" | "email" | "userProfileImage" | "password" | "jiraKey" | "jiraAccountId" | "jiraApiToken" | "employmentType" | "companyJoinedDate" | "probationStartDate" | "probationEndDate" | "confirmationDate" | "teamJoinedDate" | "teamId_Secondary" | "functionalTeamId" | "functionalTeamId_Secondary" | "teamId_DU" | "designationId" | "departmentId" | "designationAppointDate" | "userId_Supervisor" | "bitbucketUsername" | "atlassianToken" | "permissionLevel" | "lastLogin" | "countryId" | "resignedDate" | "isResigned" | "dontSync" | "createdAt" | "updatedAt" | "updatedBy" | "passwordExpirationDate" | "credentialMailSent";
export type UserModelCreationAttributes = Optional<UserModelAttributes, UserModelOptionalAttributes>;

export class UserModel extends Model<UserModelAttributes, UserModelCreationAttributes> implements UserModelAttributes {
  id!: number;
  employeeNumber!: number;
  firstName?: string;
  lastName?: string;
  gender?: number;
  email?: string;
  userProfileImage?: string;
  password?: string;
  jiraKey?: string;
  jiraAccountId?: string;
  jiraApiToken?: string;
  employmentType?: number;
  companyJoinedDate?: string;
  probationStartDate?: string;
  probationEndDate?: string;
  confirmationDate?: string;
  teamJoinedDate?: string;
  teamId!: number;
  teamId_Secondary?: number;
  functionalTeamId?: number;
  functionalTeamId_Secondary?: number;
  teamId_DU?: number;
  userId_DUH!: number;
  designationId?: number;
  departmentId?: number;
  designationAppointDate?: string;
  userId_Supervisor?: number;
  bitbucketUsername?: string;
  atlassianToken?: string;
  isActive!: string;
  activationCode!: string;
  permissionLevel?: number;
  lastLogin?: Date;
  privAdmin!: string;
  countryId?: number;
  resignedDate?: string;
  isResigned?: number;
  dontSync?: number;
  createdAt?: Date;
  updatedAt?: Date;
  updatedBy?: number;
  passwordExpirationDate?: string;
  credentialMailSent?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof UserModel {
    return UserModel.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    employeeNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "employeeNumber"
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "1-Male, 2-Female"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "email"
    },
    userProfileImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    jiraKey: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "jiraKey"
    },
    jiraAccountId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    jiraApiToken: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    employmentType: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "1-Permanent, 2-Contract Basis"
    },
    companyJoinedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01"
    },
    probationStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    probationEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    confirmationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    teamJoinedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2000-01-01",
      comment: "Joind date of of the current team"
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    teamId_Secondary: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    functionalTeamId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    functionalTeamId_Secondary: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    teamId_DU: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    userId_DUH: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    designationId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    designationAppointDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    userId_Supervisor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bitbucketUsername: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    atlassianToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    activationCode: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    permissionLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 80
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    privAdmin: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    resignedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    isResigned: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    dontSync: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "UserId of the updated user"
    },
    passwordExpirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    credentialMailSent: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'UserModel',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "employeeNumber",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "employeeNumber" },
        ]
      },
      {
        name: "jiraKey",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "jiraKey" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "designationId",
        using: "BTREE",
        fields: [
          { name: "designationId" },
        ]
      },
      {
        name: "teamId",
        using: "BTREE",
        fields: [
          { name: "teamId" },
        ]
      },
      {
        name: "departmentId",
        using: "BTREE",
        fields: [
          { name: "departmentId" },
        ]
      },
    ]
  });
  }
}
