import { IResponseDTO, ISendAgreementRequestDTO } from "../../../domain/dtos";

/**
 * Interface for the use case of send an agreement.
 *
 * @interface
 */
export interface ISendAgreementUseCase {
  /**
   * Executes the send agreement use case.
   *
   * @async
   * @param {ISendAgreementRequestDTO} data - The data for sending an agreement.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ISendAgreementRequestDTO): Promise<IResponseDTO>;
}
