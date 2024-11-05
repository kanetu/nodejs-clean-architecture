import { IAgreementRepository } from "../../../application/repositories";
import { SendAgreementUseCase } from "../../../application/useCases/implementations/SendAgreementUseCase";
import { ISendAgreementUseCase } from "../../../application/useCases/interfaces/ISendAgreement";
import { IController } from "../../../presentation/http/controllers/IController";
import { SendAgreementController } from "../../../presentation/http/controllers/implementations/SendAgreement";
import { replaceWithEnv } from "../../../utils/replaceWithEnv";
import AgreementRepository from "../../repositories/agreementRepository";
import "dotenv/config";

/**
 * Composer function for creating and configuring the components required for sending agreement.
 *
 * @function
 * @returns {IController} The configured send agreement controller.
 */
export function sendAgreementComposer(): IController {
  const databaseConfig = {
    host: replaceWithEnv("DB_SYSTEM_HOST"),
    port: replaceWithEnv("DB_SYSTEM_PORT"),
    username: replaceWithEnv("DB_SYSTEM_USERNAME"),
    password: replaceWithEnv("DB_SYSTEM_PASSWORD"),
    database: replaceWithEnv("DB_SYSTEM_DATABASE"),
  };

  const adobeAcrobatSignToken = replaceWithEnv(
    "ADOBE_ACROBAT_SIGN_AUTHORISE_TOKEN"
  );
  const agreementRepository: IAgreementRepository = new AgreementRepository(
    databaseConfig
  );
  const useCase: ISendAgreementUseCase = new SendAgreementUseCase(
    adobeAcrobatSignToken,
    agreementRepository
  );
  const controller: IController = new SendAgreementController(useCase);
  return controller;
}
