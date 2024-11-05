import { validate } from "class-validator";
import { IDownloadAgreementUseCase } from "../../../../application/useCases/interfaces/IDownloadAgreement";
import { IDownloadAgreementRequestDTO, IResponseDTO } from "../../../../domain/dtos";
import { HttpErrors } from "../../helpers/implementations/HttpErrors";
import { HttpResponse } from "../../helpers/implementations/HttpResponse";
import { HttpSuccess } from "../../helpers/implementations/HttpSuccess";
import { IHttpErrors } from "../../helpers/interfaces/IHttpErrors";
import { IHttpRequest } from "../../helpers/interfaces/IHttpRequest";
import { IHttpResponse } from "../../helpers/interfaces/IHttpResponse";
import { IHttpSuccess } from "../../helpers/interfaces/IHttpSuccess";
import { IController } from "../IController";

/**
 * Controller for handling requests to download an agreement.
 */
export class DownloadAgreementController implements IController {
  /**
   * Creates an instance of DownloadAgreementController.
   * @param downloadAgreementCase The use case for downloading an agreement.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private downloadAgreementCase: IDownloadAgreementUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to download an agreement.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: IResponseDTO;

    if (httpRequest.params && Object.keys(httpRequest.params).length > 0) {
      const params = httpRequest.params as IDownloadAgreementRequestDTO

      if (!params.agreementId) {
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, error.body);
      }

      response = await this.downloadAgreementCase.execute({ agreementId: params.agreementId});

      if (!response.success) {
        error = this.httpErrors.error_400();
        return new HttpResponse(error.statusCode, response.data);
      }

      const success = this.httpSuccess.success_200(response.data);
      return new HttpResponse(success.statusCode, success.body);
    }

    error = this.httpErrors.error_500();
    return new HttpResponse(error.statusCode, error.body);
  }
}
