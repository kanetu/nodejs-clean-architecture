import { GetAgreementTemplatesUseCase } from "../../../application/useCases/implementations/GetAgreementTemplatesUseCase";
import { IGetAgreementTemplatesUseCase } from "../../../application/useCases/interfaces/IGetAgreementTemplates";
import { IController } from "../../../presentation/http/controllers/IController";
import { GetAgreementTemplatesController } from "../../../presentation/http/controllers/implementations/GetAgreementTemplates";
import { replaceWithEnv } from "../../../utils/replaceWithEnv";
import "dotenv/config";

/**
 * Composer function for creating and configuring the components required for getting agreement templates.
 *
 * @function
 * @returns {IController} The configured get agreement templates controller.
 */
export function getAgreementTemplatesComposer(): IController {
  const adobeAcrobatSignToken = replaceWithEnv(
    "ADOBE_ACROBAT_SIGN_AUTHORISE_TOKEN"
  );
  const useCase: IGetAgreementTemplatesUseCase =
    new GetAgreementTemplatesUseCase(adobeAcrobatSignToken);
  const controller: IController = new GetAgreementTemplatesController(useCase);
  return controller;
}
