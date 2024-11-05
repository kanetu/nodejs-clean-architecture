import { IGetAgreementUseCase } from "../interfaces/IGetAgreement";
import { IGetAgreementRequestDTO, IResponseDTO } from "../../../domain/dtos";
import { AxiosInstance } from "axios";
import { AdobeAcrobatSignService } from "../../../services";

/**
 * Use case for getting an agreement.
 *
 * @class
 * @implements {GetAgreementUseCase}
 */
export class GetAgreementUseCase implements IGetAgreementUseCase {
  /**
   * Creates an instance of GetAgreementUseCase.
   *
   * @constructor
   * @param {AxiosInstance} axiosInstance - The axios instance
   */
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Executes the get agreement use case.
   *
   * @async
   * @param {IGetAgreementRequestDTO} request - The request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    agreementId,
  }: IGetAgreementRequestDTO): Promise<IResponseDTO> {
    try {
      // TODO: Consider to put AdobeAcrobatSignService in the right way
      const { data } = await AdobeAcrobatSignService.getAgreementService(
        this.axiosInstance,
        agreementId
      );

      if (!data) {
        return {
          success: false,
          data: { error: `Can't get agreement id ${agreementId}` },
        };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }
}
