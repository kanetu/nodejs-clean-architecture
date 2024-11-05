import { IGetLoggedInUserRequestDTO, IResponseDTO } from "../../../domain/dtos";

/**
 * Interface for the use case of get logged in user.
 *
 * @interface
 */
export interface IGetLoggedInUserUseCase {
  /**
   * Executes the get logged in user use case.
   *
   * @async
   * @param {IGetLoggedInUserRequestDTO} data - The data for getting logged in user.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: IGetLoggedInUserRequestDTO): Promise<IResponseDTO>;
}
