import { User } from "../../domain/entities";
import {
  UserPersonalInformationModel,
  UserModel,
} from "../databases/initModels";
import {
  PersonTitle,
  PersonMaritalStatus,
  PersonBloodGroup,
} from "../../domain/enums";
import BaseRepository from "./baseRepository";
import { IUserRepository } from "../../application/repositories";

export default class UserRepository
  extends BaseRepository
  implements IUserRepository
{
  async findUserByEmail(email: string | undefined): Promise<User | undefined> {
    const record = await UserPersonalInformationModel.findOne({
      include: { model: UserModel, where: { email: email } },
    });

    const title: PersonTitle = record?.personalInfo_title ?? 0;
    const maritalStatus: PersonMaritalStatus =
      record?.personalInfo_maritalStatus ?? 0;
    const bloodGroup: PersonBloodGroup = record?.personalInfo_bloodGroup ?? 0;

    const user = record
      ? new User({
          id: record.userId,
          title: title,
          fullName: record.personalInfo_fullName ?? "",
          maritalStatus: maritalStatus,
          bloodGroup: bloodGroup,
          dob: new Date(record.personalInfo_birthday ?? "0000-00-00"),
          nicNo: record.personalInfo_nicNum ?? "",
          dlNo: record.personalInfo_drivingLicenseNum ?? "",
          passportNo: record.personalInfo_passportNum ?? "",
          passportExpDate: new Date(
            record.personalInfo_passportExpDate ?? "0000-00-00"
          ),
          homeTown: record.personalInfo_homeTown ?? "",
          zipCode: record.personalInfo_zipCode ?? "",
        })
      : undefined;

    return user;
  }

  async update(user: User): Promise<unknown> {
    return await UserPersonalInformationModel.update(
      {
        personalInfo_title: user.title,
        personalInfo_fullName: user.fullName,
        personalInfo_maritalStatus: user.maritalStatus,
        personalInfo_bloodGroup: user.bloodGroup,
        personalInfo_birthday: user.dob,
        personalInfo_nicNum: user.nicNo,
        personalInfo_drivingLicenseNum: user.dlNo,
        personalInfo_passportNum: user.passportNo,
        personalInfo_passportExpDate: user.passportExpDate,
        personalInfo_homeTown: user.homeTown,
        personalInfo_zipCode: user.zipCode,
      },
      {
        where: {
          userId: user.id,
        },
      }
    );
  }
}
