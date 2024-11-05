import { IResponseDTO } from "../../../../domain/dtos";
import { HttpErrors } from "../../helpers/implementations/HttpErrors";
import { HttpResponse } from "../../helpers/implementations/HttpResponse";
import { HttpSuccess } from "../../helpers/implementations/HttpSuccess";
import { IHttpErrors } from "../../helpers/interfaces/IHttpErrors";
import { IHttpResponse } from "../../helpers/interfaces/IHttpResponse";
import { IHttpSuccess } from "../../helpers/interfaces/IHttpSuccess";
import { IController } from "../IController";
import { IGetAgreementTemplatesUseCase } from "../../../../application/useCases/interfaces/IGetAgreementTemplates";

/**
 * Controller for handling requests to get agreement templates.
 */
export class GetAgreementTemplatesController implements IController {
  /**
   * Creates an instance of GetAgreementTemplatesController.
   * @param getAgreementTemplatesCase The use case for getting agreement templates.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private getAgreementTemplatesCase: IGetAgreementTemplatesUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to get agreements.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(): Promise<IHttpResponse> {
    let error;
    let response: IResponseDTO;

    response = await this.getAgreementTemplatesCase.execute();

    if (!response.success) {
      error = this.httpErrors.error_400();
      return new HttpResponse(error.statusCode, response.data);
    }

    const success = this.httpSuccess.success_200(response.data);
    return new HttpResponse(success.statusCode, success.body);
  }
}
