import {
  IResponseDTO,
  IUpdateLoggedInUserRequestDTO,
} from "../../../domain/dtos";
import { IUpdateLoggedInUserUseCase } from "../interfaces/IUpdateLoggedInUser";
import { IUserRepository } from "../../repositories";
import { User } from "../../../domain/entities";

/**
 * Use case for updating logged in user.
 *
 * @class
 * @implements {UpdateLoggedInUserUseCase}
 */
export class UpdateLoggedInUserUseCase implements IUpdateLoggedInUserUseCase {
  /**
   * Creates an instance of UpdateLoggedInUserUseCase.
   *
   * @constructor
   * @param {IUserRepository} userRepository - The user repository
   */
  constructor(private userRepository: IUserRepository) {}

  /**
   * Executes the get logged in user use case.
   *
   * @async
   * @param {IUpdateLoggedInUserRequestDTO} request - The request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    preferredUsername,
    title,
    fullName,
    maritalStatus,
    bloodGroup,
    dob,
    nicNo,
    dlNo,
    passportNo,
    passportExpDate,
    homeTown,
    zipCode,
  }: IUpdateLoggedInUserRequestDTO): Promise<IResponseDTO> {
    try {
      const currentUser = await this.userRepository.findUserByEmail(
        preferredUsername
      );

      if (!currentUser) {
        return {
          success: false,
          data: {
            error: `User ${preferredUsername} is not available`,
          },
        };
      }

      const user = new User({
        id: currentUser.id!,
        title: title,
        fullName: fullName,
        maritalStatus: maritalStatus,
        bloodGroup: bloodGroup,
        dob: new Date(dob),
        nicNo: nicNo,
        dlNo: dlNo,
        passportNo: passportNo,
        passportExpDate: new Date(passportExpDate),
        homeTown: homeTown,
        zipCode: zipCode,
      });
      const result = await this.userRepository.update(user);

      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: { error: error } };
    }
  }
}
