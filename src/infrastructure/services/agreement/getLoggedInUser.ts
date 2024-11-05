import { IUserRepository } from "../../../application/repositories";
import { GetLoggedInUserUseCase } from "../../../application/useCases/implementations/GetLoggedInUserUseCase";
import { IGetLoggedInUserUseCase } from "../../../application/useCases/interfaces/IGetLoggedInUser";
import { IController } from "../../../presentation/http/controllers/IController";
import { GetLoggedInUserController } from "../../../presentation/http/controllers/implementations/GetLoggedInUser";
import { replaceWithEnv } from "../../../utils/replaceWithEnv";
import UserRepository from "../../repositories/userRepository";
import "dotenv/config";

/**
 * Composer function for creating and configuring the components required for getting logged in user.
 *
 * @function
 * @returns {IController} The configured get logged in user controller.
 */
export function getLoggedInUserComposer(): IController {
  const databaseConfig = {
    host: replaceWithEnv("DB_SYSTEM_HOST"),
    port: replaceWithEnv("DB_SYSTEM_PORT"),
    username: replaceWithEnv("DB_SYSTEM_USERNAME"),
    password: replaceWithEnv("DB_SYSTEM_PASSWORD"),
    database: replaceWithEnv("DB_SYSTEM_DATABASE"),
  };
  const userRepository: IUserRepository = new UserRepository(databaseConfig);
  const useCase: IGetLoggedInUserUseCase = new GetLoggedInUserUseCase(
    userRepository
  );
  const controller: IController = new GetLoggedInUserController(useCase);
  return controller;
}
