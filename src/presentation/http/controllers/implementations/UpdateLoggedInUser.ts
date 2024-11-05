import { validate } from "class-validator";
import {
  IResponseDTO,
  ISendAgreementRequestDTO,
  IUpdateLoggedInUserRequestDTO,
} from "../../../../domain/dtos";
import { HttpErrors } from "../../helpers/implementations/HttpErrors";
import { HttpResponse } from "../../helpers/implementations/HttpResponse";
import { HttpSuccess } from "../../helpers/implementations/HttpSuccess";
import { IHttpErrors } from "../../helpers/interfaces/IHttpErrors";
import { IHttpRequest } from "../../helpers/interfaces/IHttpRequest";
import { IHttpResponse } from "../../helpers/interfaces/IHttpResponse";
import { IHttpSuccess } from "../../helpers/interfaces/IHttpSuccess";
import { IController } from "../IController";
import { SendAgreementValidator } from "../../../../validators/sendAgreementValidator";
import { IUpdateLoggedInUserUseCase } from "../../../../application/useCases/interfaces/IUpdateLoggedInUser";
import { UpdateLoggedInUserValidator } from "../../../../validators/updateUserLoggedInValidator";

/**
 * Controller for handling requests to update logged in user.
 */
export class UpdateLoggedInUserController implements IController {
  /**
   * Creates an instance of UpdateLoggedInUserController.
   * @param updateLoggedInUserCase The use case for updating logged in user.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private updateLoggedInUserCase: IUpdateLoggedInUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) {}

  /**
   * Handles an HTTP request to update logged in user.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error;
    let response: IResponseDTO;

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0 && httpRequest.authInfo) {
      const body = httpRequest.body as IUpdateLoggedInUserRequestDTO;
      const authInfo = httpRequest.authInfo;

      const userData = new UpdateLoggedInUserValidator();
      userData.preferredUsername = authInfo.preferred_username;
      userData.id = body.id;
      userData.title = body.title;
      userData.fullName = body.fullName;
      userData.bloodGroup = body.bloodGroup;
      userData.maritalStatus = body.maritalStatus;
      userData.dob = body.dob;
      userData.nicNo = body.nicNo;
      userData.dlNo = body.dlNo;
      userData.passportNo = body.passportNo;
      userData.passportExpDate = body.passportExpDate;
      userData.homeTown = body.homeTown;
      userData.zipCode = body.zipCode;

      const validateError = await validate(userData);

      if (validateError.length > 0) {
        error = this.httpErrors.error_422();
        return new HttpResponse(error.statusCode, validateError);
      }

      response = await this.updateLoggedInUserCase.execute(userData);

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
