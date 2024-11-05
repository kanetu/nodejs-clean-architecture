import { DownloadAgreementUseCase } from "../../../application/useCases/implementations/DownloadAgreementUseCase";
import { IDownloadAgreementUseCase } from "../../../application/useCases/interfaces/IDownloadAgreement";
import adobeAcrobatSignInstance from "../../../libs/axios";
import { IController } from "../../../presentation/http/controllers/IController";
import { DownloadAgreementController } from "../../../presentation/http/controllers/implementations/DownloadAgreement";
import { replaceWithEnv } from "../../../utils/replaceWithEnv";
import "dotenv/config";

/**
 * Composer function for creating and configuring the components required for downloading agreement.
 *
 * @function
 * @returns {IController} The configured downloading agreement controller.
 */
export function downloadAgreementComposer(): IController {
  const adobeAcrobatSignToken = replaceWithEnv(
    "ADOBE_ACROBAT_SIGN_AUTHORISE_TOKEN"
  );
  
  const useCase: IDownloadAgreementUseCase = new DownloadAgreementUseCase(adobeAcrobatSignInstance);
  const controller: IController = new DownloadAgreementController(useCase);
  return controller;
}
