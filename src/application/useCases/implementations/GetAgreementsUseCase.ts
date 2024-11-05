import { IGetAgreementsUseCase } from "../interfaces/IGetAgreements";
import { IResponseDTO } from "../../../domain/dtos";
import { IAgreementRepository } from "../../repositories";

const SwaggerJsClient = require("swagger-js-client");
/**
 * Use case for getting agreements.
 *
 * @class
 * @implements {GetAgreementsUseCase}
 */
export class GetAgreementsUseCase implements IGetAgreementsUseCase {
  /**
   * Creates an instance of GetAgreementsUseCase.
   *
   * @constructor
   * @param {IAgreementRepository} agreementRepository - The agreement repository
   * @param {string} adobeAcrobatKey - adobe acrobat key
   */
  constructor(
    private agreementRepository: IAgreementRepository,
    private adobeAcrobatKey: string
  ) {}

  /**
   * Executes the get agreements use case.
   *
   * @async
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(): Promise<IResponseDTO> {
    const getAgreementsApiInstance = new SwaggerJsClient.AgreementsApi();

    const data = await getAgreementsApiInstance
      .getAgreements(this.adobeAcrobatKey, {})
      .then(
        (data: any) => data,
        (error: unknown) => {
          console.log(error);
        }
      );

    const { userAgreementList } = data;

    const agreements = await this.agreementRepository.findAll();

    const userAgreementListMapped = userAgreementList.map(
      (userAgreement: any) => {
        const agreement = agreements.find(
          (agreement) => agreement.id === userAgreement.id
        );

        return agreement
          ? {
              ...userAgreement,
              approver: agreement.approver,
              recipient: agreement.recipient,
              fileName: agreement.fileName,
            }
          : userAgreement;
      }
    );

    if (!data) {
      return { success: false, data: { error: "Can't get agreements" } };
    }

    return {
      success: true,
      data: { ...data, userAgreementList: userAgreementListMapped },
    };
  }
}
