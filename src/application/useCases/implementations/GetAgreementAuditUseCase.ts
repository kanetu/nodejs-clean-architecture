import {
  IGetAgreementAuditRequestDTO,
  IResponseDTO,
} from "../../../domain/dtos";
import { IGetAgreementAuditUseCase } from "../interfaces/IGetAgreementAudit";

const SwaggerJsClient = require("swagger-js-client");

/**
 * Use case for getting an agreement audit.
 *
 * @class
 * @implements {GetAgreementAuditUseCase}
 */
export class GetAgreementAuditUseCase implements IGetAgreementAuditUseCase {
  /**
   * Creates an instance of GetAgreementAuditUseCase.
   *
   * @constructor
   * @param {string} adobeAcrobatKey - adobe acrobat key
   */
  constructor(private adobeAcrobatKey: string) {}

  /**
   * Executes the get agreement use case.
   *
   * @async
   * @param {IGetAgreementAuditRequestDTO} request - The request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({agreementId}: IGetAgreementAuditRequestDTO): Promise<IResponseDTO> {

    const getAgreementAuditApiInstance = new SwaggerJsClient.AgreementsApi();

    const response = await getAgreementAuditApiInstance
      .getAuditTrail(this.adobeAcrobatKey, agreementId)
      .then(
        (data: any) => data,
        (error: unknown) => {
          console.log(error);
        }
      );

    if (!response) {
      return {
        success: false,
        data: {
          error: `Can't get agreement audit of agreement id ${agreementId} `,
        },
      };
    }
    return { success: true, data: response };
  }
}
