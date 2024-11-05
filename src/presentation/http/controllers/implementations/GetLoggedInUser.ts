import { IResponseDTO } from "../../../../domain/dtos";
import { HttpErrors } from "../../helpers/implementations/HttpErrors";
import { HttpResponse } from "../../helpers/implementations/HttpResponse";
import { HttpSuccess } from "../../helpers/implementations/HttpSuccess";
import { IHttpErrors } from "../../helpers/interfaces/IHttpErrors";
import { IHttpRequest } from "../../helpers/interfaces/IHttpRequest";
import { IHttpResponse } from "../../helpers/interfaces/IHttpResponse";
import { IHttpSuccess } from "../../helpers/interfaces/IHttpSuccess";
import { IController } from "../IController";
import { IGetLoggedInUserUseCase } from "../../../../application/useCases/interfaces/IGetLoggedInUser";

/**
 * Controller for handling requests to get logged in user .
 */
export class GetLoggedInUserController implements IController {
  /**
   * Creates an instance of GetLoggedInUserController.
   * @param getLoggedInUserCase The use case for getting logged in user.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private getLoggedInUserCase: IGetLoggedInUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to get logged in user .
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: IResponseDTO;

    if (httpRequest.authInfo && Object.keys(httpRequest.authInfo).length > 0) {
      const authInfo = httpRequest.authInfo

      if (!authInfo.preferred_username) {
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, error.body);
      }

      response = await this.getLoggedInUserCase.execute({ preferredUsername: authInfo.preferred_username});

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
