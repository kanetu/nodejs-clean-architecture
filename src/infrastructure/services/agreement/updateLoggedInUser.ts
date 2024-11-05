import { IUserRepository } from "../../../application/repositories";
import { UpdateLoggedInUserUseCase } from "../../../application/useCases/implementations/UpdateLoggedInUserUseCase";
import { IUpdateLoggedInUserUseCase } from "../../../application/useCases/interfaces/IUpdateLoggedInUser";
import { IController } from "../../../presentation/http/controllers/IController";
import { UpdateLoggedInUserController } from "../../../presentation/http/controllers/implementations/UpdateLoggedInUser";
import { replaceWithEnv } from "../../../utils/replaceWithEnv";
import UserRepository from "../../repositories/userRepository";
import "dotenv/config";

/**
 * Composer function for creating and configuring the components required for updating logged in user.
 *
 * @function
 * @returns {IController} The configured update logged in user controller.
 */
export function updateLoggedInUserComposer(): IController {
  const databaseConfig = {
    host: replaceWithEnv("DB_SYSTEM_HOST"),
    port: replaceWithEnv("DB_SYSTEM_PORT"),
    username: replaceWithEnv("DB_SYSTEM_USERNAME"),
    password: replaceWithEnv("DB_SYSTEM_PASSWORD"),
    database: replaceWithEnv("DB_SYSTEM_DATABASE"),
  };
  const userRepository: IUserRepository = new UserRepository(databaseConfig);
  const useCase: IUpdateLoggedInUserUseCase = new UpdateLoggedInUserUseCase(
    userRepository
  );
  const controller: IController = new UpdateLoggedInUserController(useCase);
  return controller;
}
