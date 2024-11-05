import { IGetAgreementTemplateFormFieldsRequestDTO, IResponseDTO } from "../../../../domain/dtos";
import { HttpErrors } from "../../helpers/implementations/HttpErrors";
import { HttpResponse } from "../../helpers/implementations/HttpResponse";
import { HttpSuccess } from "../../helpers/implementations/HttpSuccess";
import { IHttpErrors } from "../../helpers/interfaces/IHttpErrors";
import { IHttpResponse } from "../../helpers/interfaces/IHttpResponse";
import { IHttpSuccess } from "../../helpers/interfaces/IHttpSuccess";
import { IController } from "../IController";
import { IGetAgreementTemplateFormFieldsUseCase } from "../../../../application/useCases/interfaces/IGetAgreementTemplateFormFields";
import { HttpRequest } from "../../helpers/implementations/HttpRequest";

/**
 * Controller for handling requests to get agreement templates.
 */
export class GetAgreementTemplateFormFieldsController implements IController {
  /**
   * Creates an instance of GetAgreementTemplateFormFieldsController.
   * @param getAgreementTemplateFormFieldsCase The use case for getting agreement template form fields.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private getAgreementTemplateFormFieldsCase: IGetAgreementTemplateFormFieldsUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to get agreements.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error;
    let response: IResponseDTO;

    if (httpRequest.params && Object.keys(httpRequest.params).length > 0) {
      const params = httpRequest.params as IGetAgreementTemplateFormFieldsRequestDTO

      if (!params.libraryDocumentId) {
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, error.body);
      }

      response = await this.getAgreementTemplateFormFieldsCase.execute({libraryDocumentId: params.libraryDocumentId});

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
