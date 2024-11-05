import { GetAgreementUseCase } from "../../../application/useCases/implementations/GetAgreementUseCase";
import { IGetAgreementUseCase } from "../../../application/useCases/interfaces/IGetAgreement";
import adobeAcrobatSignInstance from "../../../libs/axios";
import { IController } from "../../../presentation/http/controllers/IController";
import { GetAgreementController } from "../../../presentation/http/controllers/implementations/GetAgreement";
import "dotenv/config";

/**
 * Composer function for creating and configuring the components required for getting an agreement.
 *
 * @function
 * @returns {IController} The configured getting an agreement controller.
 */
export function getAgreementComposer(): IController {
  const useCase: IGetAgreementUseCase = new GetAgreementUseCase(
    adobeAcrobatSignInstance
  );
  const controller: IController = new GetAgreementController(useCase);
  return controller;
}
