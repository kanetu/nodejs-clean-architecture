import { IGetAgreementTemplateFormFieldsRequestDTO, IResponseDTO } from "../../../domain/dtos";

/**
 * Interface for the use case of get an agreement.
 *
 * @interface
 */
export interface IGetAgreementTemplateFormFieldsUseCase {
  /**
   * Executes the get agreement template form fields use case.
   *
   * @async
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: IGetAgreementTemplateFormFieldsRequestDTO): Promise<IResponseDTO>
}
