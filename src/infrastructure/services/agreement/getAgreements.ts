import { IAgreementRepository } from "../../../application/repositories";
import { GetAgreementsUseCase } from "../../../application/useCases/implementations/GetAgreementsUseCase";
import { IGetAgreementsUseCase } from "../../../application/useCases/interfaces/IGetAgreements";
import { IController } from "../../../presentation/http/controllers/IController";
import { GetAgreementsController } from "../../../presentation/http/controllers/implementations/GetAgreements";
import { replaceWithEnv } from "../../../utils/replaceWithEnv";
import "dotenv/config";
import AgreementRepository from "../../repositories/agreementRepository";

/**
 * Composer function for creating and configuring the components required for getting agreements.
 *
 * @function
 * @returns {IController} The configured getting agreements controller.
 */
export function getAgreementsComposer(): IController {
  
  const adobeAcrobatSignToken = replaceWithEnv(
    "ADOBE_ACROBAT_SIGN_AUTHORISE_TOKEN"
  );

  const databaseConfig = {
    host: replaceWithEnv("DB_SYSTEM_HOST"),
    port: replaceWithEnv("DB_SYSTEM_PORT"),
    username: replaceWithEnv("DB_SYSTEM_USERNAME"),
    password: replaceWithEnv("DB_SYSTEM_PASSWORD"),
    database: replaceWithEnv("DB_SYSTEM_DATABASE"),
  };

  const agreementRepository: IAgreementRepository = new AgreementRepository(databaseConfig)

  const useCase: IGetAgreementsUseCase = new GetAgreementsUseCase(
    agreementRepository,
    adobeAcrobatSignToken
  );
  const controller: IController = new GetAgreementsController(useCase);
  return controller;
}
