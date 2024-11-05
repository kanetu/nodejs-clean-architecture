import { IGetLoggedInUserRequestDTO, IResponseDTO } from "../../../domain/dtos";
import { IGetLoggedInUserUseCase } from "../interfaces/IGetLoggedInUser";
import { IUserRepository } from "../../repositories";

// TODO: Put those declare in *.d.ts
declare global {
  namespace Express {
    interface AuthInfo {
      preferred_username: string;
    }
  }
}

/**
 * Use case for getting logged in user.
 *
 * @class
 * @implements {GetLoggedInUserUseCase}
 */
export class GetLoggedInUserUseCase implements IGetLoggedInUserUseCase {
  /**
   * Creates an instance of GetLoggedInUserUseCase.
   *
   * @constructor
   * @param {IUserRepository} userRepository - The user repository
   */
  constructor(private userRepository: IUserRepository) {}

  /**
   * Executes the get logged in user use case.
   *
   * @async
   * @param {IGetLoggedInUserRequestDTO} request - The request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    preferredUsername,
  }: IGetLoggedInUserRequestDTO): Promise<IResponseDTO> {
    try {
      const data = await this.userRepository.findUserByEmail(preferredUsername);
      return { success: true, data };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }
}
