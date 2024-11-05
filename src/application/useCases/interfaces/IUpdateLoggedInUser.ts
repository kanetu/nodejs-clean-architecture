import { IResponseDTO, IUpdateLoggedInUserRequestDTO } from "../../../domain/dtos";

/**
 * Interface for the use case of update logged in user.
 *
 * @interface
 */
export interface IUpdateLoggedInUserUseCase {
  /**
   * Executes the update logged in user use case.
   *
   * @async
   * @param {IUpdateLoggedInUserRequestDTO} data - The data for updating logged in user.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: IUpdateLoggedInUserRequestDTO): Promise<IResponseDTO>;
}
