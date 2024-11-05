import { GetAgreementTemplateFormFieldsUseCase } from "../../../application/useCases/implementations/GetAgreementTemplateFormFieldsUseCase";
import { IGetAgreementTemplateFormFieldsUseCase } from "../../../application/useCases/interfaces/IGetAgreementTemplateFormFields";
import adobeAcrobatSignInstance from "../../../libs/axios";
import { IController } from "../../../presentation/http/controllers/IController";
import { GetAgreementTemplateFormFieldsController } from "../../../presentation/http/controllers/implementations/GetAgreementTemplateFormFields";

/**
 * Composer function for creating and configuring the components required for getting agreement templates.
 *
 * @function
 * @returns {IController} The configured get agreement templates controller.
 */
export function getAgreementTemplateFormFieldsComposer(): IController {
  const useCase: IGetAgreementTemplateFormFieldsUseCase =
    new GetAgreementTemplateFormFieldsUseCase(adobeAcrobatSignInstance);
  const controller: IController = new GetAgreementTemplateFormFieldsController(useCase);
  return controller;
}
