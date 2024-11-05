import { IsEmail, IsString } from "class-validator";

export class SendAgreementValidator {
  @IsString()
  documentName: string

  @IsEmail()
  recipientEmail: string;
  
  @IsEmail()
  approverEmail: string;
}
