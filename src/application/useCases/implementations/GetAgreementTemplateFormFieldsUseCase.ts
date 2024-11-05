import { AxiosInstance } from "axios";
import { IGetAgreementTemplateFormFieldsRequestDTO, IResponseDTO } from "../../../domain/dtos";
import { IGetAgreementTemplateFormFieldsUseCase } from "../interfaces/IGetAgreementTemplateFormFields";
import { AdobeAcrobatSignService } from "../../../services";

/**
 * Use case for getting agreement template form fields.
 *
 * @class
 * @implements {GetAgreementTemplateFormFieldsUseCase}
 */
export class GetAgreementTemplateFormFieldsUseCase
  implements IGetAgreementTemplateFormFieldsUseCase
{
  /**
   * Creates an instance of GetAgreementTemplateFormFieldsUseCase.
   * @param {string} axiosInstance
   * @constructor
   */
  constructor(private axiosInstance: AxiosInstance) {}

  /**
   * Executes the get agreement template form fields use case.
   *
   * @async
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({libraryDocumentId}: IGetAgreementTemplateFormFieldsRequestDTO): Promise<IResponseDTO> {
    try {
      
      const { data } = await AdobeAcrobatSignService.getLibraryDocumentFormFieldsService(this.axiosInstance, libraryDocumentId);
     
      return { success: true, data };
    } catch (error) {
      return { success: false, data: { error: error } };
    }
  }
}
