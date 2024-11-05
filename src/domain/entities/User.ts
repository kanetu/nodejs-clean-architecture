import { PersonTitle, PersonMaritalStatus, PersonBloodGroup } from "../enums";

export interface IUser {
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

export default class User {
  _id: number = 0;
  _title: PersonTitle;
  _fullName: string;
  _maritalStatus: PersonMaritalStatus;
  _bloodGroup: PersonBloodGroup;
  _dob: Date;
  _nicNo: string;
  _dlNo: string;
  _passportNo: string;
  _passportExpDate: Date;
  _homeTown: string;
  _zipCode: string;

  get id(): number | undefined {
    return this._id;
  }

  get title(): PersonTitle {
    return this._title;
  }

  get fullName(): string {
    return this._fullName;
  }

  get maritalStatus(): PersonMaritalStatus {
    return this._maritalStatus;
  }

  get bloodGroup(): PersonBloodGroup {
    return this._bloodGroup;
  }

  get dob(): Date {
    return this.dob;
  }

  get nicNo(): string {
    return this._nicNo;
  }
  get dlNo(): string {
    return this._dlNo;
  }
  get passportNo(): string {
    return this._passportNo;
  }

  get passportExpDate(): Date {
    return this.passportExpDate;
  }

  get homeTown(): string {
    return this._homeTown;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  static create(user: IUser): User {
    return new User(user);
  }

  constructor({
    id,
    title,
    fullName,
    maritalStatus,
    bloodGroup,
    dob,
    dlNo,
    nicNo,
    passportNo,
    passportExpDate,
    homeTown,
    zipCode,
  }: IUser) {
    this._id = id;
    this._title = title;
    this._fullName = fullName;
    this._maritalStatus = maritalStatus;
    this._bloodGroup = bloodGroup;
    this._dob = dob;
    this._nicNo = nicNo;
    this._dlNo = dlNo;
    this._passportNo = passportNo;
    this._passportExpDate = passportExpDate;
    this._homeTown = homeTown;
    this._zipCode = zipCode;
  }
}
