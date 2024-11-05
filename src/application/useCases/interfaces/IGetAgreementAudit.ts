import { IGetAgreementAuditRequestDTO, IResponseDTO } from "../../../domain/dtos";

/**
 * Interface for the use case of get an agreement audit.
 *
 * @interface
 */
export interface IGetAgreementAuditUseCase {
  /**
   * Executes the get agreement audit use case.
   *
   * @async
   * @param {IGetAgreementAuditRequestDTO} data - The data for getting an agreement audit.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: IGetAgreementAuditRequestDTO): Promise<IResponseDTO>
}
