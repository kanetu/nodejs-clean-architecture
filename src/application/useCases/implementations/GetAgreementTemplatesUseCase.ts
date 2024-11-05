import { IGetAgreementTemplatesUseCase } from "../interfaces/IGetAgreementTemplates";
import { IResponseDTO } from "../../../domain/dtos";

const SwaggerJsClient = require("swagger-js-client");

/**
 * Use case for getting agreement templates.
 *
 * @class
 * @implements {GetAgreementTemplatesUseCase}
 */
export class GetAgreementTemplatesUseCase
  implements IGetAgreementTemplatesUseCase
{
  /**
   * Creates an instance of GetAgreementTemplatesUseCase.
   * @param {string} adobeAcrobatKey - adobe acrobat key
   * @constructor
   */
  constructor(private adobeAcrobatKey: string) {}

  /**
   * Executes the get agreement templates use case.
   *
   * @async
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(): Promise<IResponseDTO> {
    try {
      const getLibraryDocumentsApiInstance =
        new SwaggerJsClient.LibraryDocumentsApi();

      const data = await getLibraryDocumentsApiInstance.getLibraryDocuments(
        this.adobeAcrobatKey
      );

      return { success: true, data };
    } catch (error) {
      return { success: false, data: { error: error } };
    }
  }
}
