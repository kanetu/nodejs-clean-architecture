import { validate } from "class-validator";
import {
  IResponseDTO,
  ISendAgreementRequestDTO,
} from "../../../../domain/dtos";
import { HttpErrors } from "../../helpers/implementations/HttpErrors";
import { HttpResponse } from "../../helpers/implementations/HttpResponse";
import { HttpSuccess } from "../../helpers/implementations/HttpSuccess";
import { IHttpErrors } from "../../helpers/interfaces/IHttpErrors";
import { IHttpRequest } from "../../helpers/interfaces/IHttpRequest";
import { IHttpResponse } from "../../helpers/interfaces/IHttpResponse";
import { IHttpSuccess } from "../../helpers/interfaces/IHttpSuccess";
import { IController } from "../IController";
import { ISendAgreementUseCase } from "../../../../application/useCases/interfaces/ISendAgreement";
import { SendAgreementValidator } from "../../../../validators/sendAgreementValidator";

/**
 * Controller for handling requests to send an agreement.
 */
export class SendAgreementController implements IController {
  /**
   * Creates an instance of SendAgreementController.
   * @param sendAgreementCase The use case for sending an agreement.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private sendAgreementCase: ISendAgreementUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to send an agreement.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: IResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const body = httpRequest.body as ISendAgreementRequestDTO;
      const { approverEmail,documentName, recipientEmail, libraryDocumentId, ...dynamicBody } = body
      const agreementData = new SendAgreementValidator();
      agreementData.documentName = documentName;
      agreementData.approverEmail = approverEmail;
      agreementData.recipientEmail = recipientEmail;

      const validateError = await validate(agreementData);

      if (validateError.length > 0) {
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, validateError);
      }

      response = await this.sendAgreementCase.execute({
        ...agreementData,
        libraryDocumentId,
        ...dynamicBody
      });

      if (!response.success) {
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      const success = this.httpSuccess.success_201(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
