import { GetAgreementAuditUseCase } from "../../../application/useCases/implementations/GetAgreementAuditUseCase";
import { IGetAgreementAuditUseCase } from "../../../application/useCases/interfaces/IGetAgreementAudit";
import { IController } from "../../../presentation/http/controllers/IController";
import { GetAgreementAuditController } from "../../../presentation/http/controllers/implementations/GetAgreementAudit";
import { replaceWithEnv } from "../../../utils/replaceWithEnv";
import "dotenv/config";

/**
 * Composer function for creating and configuring the components required for getting an agreement audit.
 *
 * @function
 * @returns {IController} The configured getting agreement audit controller.
 */
export function getAgreementAuditComposer(): IController {
  const adobeAcrobatSignToken = replaceWithEnv(
    "ADOBE_ACROBAT_SIGN_AUTHORISE_TOKEN"
  );

  const useCase: IGetAgreementAuditUseCase = new GetAgreementAuditUseCase(
    adobeAcrobatSignToken
  );
  const controller: IController = new GetAgreementAuditController(useCase);
  return controller;
}
