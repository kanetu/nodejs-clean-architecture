import { IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import {
  PersonBloodGroup,
  PersonMaritalStatus,
  PersonTitle,
} from "../domain/enums";

export class UpdateLoggedInUserValidator {
  @IsString()
  preferredUsername: string;
  @IsNumber()
  id: number;
  @IsEnum(PersonTitle)
  title: PersonTitle;
  @IsString()
  fullName: string;
  @IsEnum(PersonMaritalStatus)
  maritalStatus: PersonMaritalStatus;
  @IsEnum(PersonBloodGroup)
  bloodGroup: PersonBloodGroup;
  @IsDate()
  dob: Date;
  @IsString()
  nicNo: string;
  @IsString()
  dlNo: string;
  @IsString()
  passportNo: string;
  @IsDate()
  passportExpDate: Date;
  @IsString()
  homeTown: string;
  @IsString()
  zipCode: string;
}
