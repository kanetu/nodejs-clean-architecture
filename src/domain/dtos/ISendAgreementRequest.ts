export interface ISendAgreementRequestDTO {
  documentName: string;
  recipientEmail: string;
  approverEmail: string;
  libraryDocumentId: string,
  [key: string]: string
}
