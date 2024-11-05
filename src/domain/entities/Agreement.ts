import { ICreateAgreementRequestDTO } from "../dtos";

export interface IAgreement {
  id?: string;
  approver: string;
  recipient: string;
  fileName: string;
}

export default class Agreement {
  private _id?: string;
  private _approver: string;
  private _recipient: string;
  private _fileName: string;

  get id(): string | undefined {
    return this._id
  }

  get approver(): string {
    return this._approver
  }

  get recipient(): string {
    return this._recipient
  }

  get fileName(): string {
    return this._fileName
  }

  static create({ id, approver, recipient, fileName }: ICreateAgreementRequestDTO): Agreement {
    return new Agreement({ id, approver, recipient, fileName })
  }

  constructor({ id, approver, recipient, fileName}: IAgreement) {
    this._id = id;
    this._approver = approver;
    this._recipient = recipient;
    this._fileName = fileName;
  }
}
