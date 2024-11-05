import { IDownloadAgreementUseCase } from "../interfaces/IDownloadAgreement";
import {
  IDownloadAgreementRequestDTO,
  IResponseDTO,
} from "../../../domain/dtos";
import { AdobeAcrobatSignService } from "../../../services";
import { AxiosInstance } from "axios";

const SwaggerJsClient = require("swagger-js-client");


/**
 * Use case for downloading an agreement.
 *
 * @class
 * @implements {DownloadAgreementUseCase}
 */
export class DownloadAgreementUseCase implements IDownloadAgreementUseCase {
  /**
   * Creates an instance of DownloadAgreementUseCase.
   *
   * @constructor
   */
  // constructor(private adobeAcrobatKey: string) {}
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Executes the create user use case.
   *
   * @async
   * @param {IDownloadAgreementRequestDTO} request - The agreement download request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */

  async execute({ agreementId }: IDownloadAgreementRequestDTO): Promise<IResponseDTO> {
    try {

    // const getAgreementAuditApiInstance = new SwaggerJsClient.AgreementsApi();

    // const response = await getAgreementAuditApiInstance
    //   .getCombinedDocument(this.adobeAcrobatKey, agreementId, {
    //     attachSupportingDocuments: true,
    //     attachAuditReport: false,
    //   })
    //   .then(
    //     (data: any) => data,
    //     (error: unknown) => {
    //       console.log(error);
    //     }
    //   );

      const result = await AdobeAcrobatSignService.downloadAgreementService(
        this.axiosInstance,
        agreementId
      );

      const {data} = result;
      if (!data) {
        return {
          success: false,
          data: {
            error: `Can't download agreement of agreement id ${agreementId} `,
          },
        };
      }
      return { success: true, data: data };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
