import { IDownloadAgreementRequestDTO, IResponseDTO } from "../../../domain/dtos";

/**
 * Interface for the use case of download an agreement.
 *
 * @interface
 */
export interface IDownloadAgreementUseCase {
  /**
   * Executes the create agreement use case.
   *
   * @async
   * @param {IDownloadAgreementRequestDTO} data - The data for creating a new agreement.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: IDownloadAgreementRequestDTO): Promise<IResponseDTO>
}
