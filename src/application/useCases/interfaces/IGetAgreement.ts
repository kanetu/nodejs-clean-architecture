import { IGetAgreementRequestDTO, IResponseDTO } from "../../../domain/dtos";

/**
 * Interface for the use case of get an agreement.
 *
 * @interface
 */
export interface IGetAgreementUseCase {
  /**
   * Executes the get agreement use case.
   *
   * @async
   * @param {IGetAgreementRequestDTO} data - The data for getting an agreement.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: IGetAgreementRequestDTO): Promise<IResponseDTO>
}
