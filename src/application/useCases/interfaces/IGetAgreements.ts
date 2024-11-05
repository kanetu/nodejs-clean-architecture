import { IResponseDTO } from "../../../domain/dtos";

/**
 * Interface for the use case of get an agreement.
 *
 * @interface
 */
export interface IGetAgreementsUseCase {
  /**
   * Executes the get agreements use case.
   *
   * @async
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(): Promise<IResponseDTO>
}
