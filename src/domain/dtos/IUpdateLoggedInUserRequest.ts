import { PersonBloodGroup, PersonMaritalStatus, PersonTitle } from "../enums";

export interface IUpdateLoggedInUserRequestDTO {
  preferredUsername: string;
  id: number;
  title: PersonTitle;
  fullName: string;
  maritalStatus: PersonMaritalStatus;
  bloodGroup: PersonBloodGroup;
  dob: Date;
  nicNo: string;
  dlNo: string;
  passportNo: string;
  passportExpDate: Date;
  homeTown: string;
  zipCode: string;
}
