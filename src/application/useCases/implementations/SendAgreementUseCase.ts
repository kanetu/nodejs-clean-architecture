import { IResponseDTO, ISendAgreementRequestDTO } from "../../../domain/dtos";
import { ISendAgreementUseCase } from "../interfaces/ISendAgreement";
import {
  AgreementRole,
  AgreementSignatureType,
  AgreementState,
} from "../../../domain/enums";
import { IAgreementRepository } from "../../repositories";
import { Agreement } from "../../../domain/entities";

const SwaggerJsClient = require("swagger-js-client");

/**
 * Use case for sending an agreement.
 *
 * @class
 * @implements {SendAgreementUseCase}
 */
export class SendAgreementUseCase implements ISendAgreementUseCase {
  /**
   * Creates an instance of SendAgreementUseCase.
   *
   * @constructor
   * @param {string} adobeAcrobatKey - adobe acrobat key
   * @param {IAgreementRepository} agreementRepository - The agreement repository
   */
  constructor(
    private adobeAcrobatKey: string,
    private agreementRepository: IAgreementRepository
  ) {}

  /**
   * Executes the send agreement use case.
   *
   * @async
   * @param {IGetAgreementRequestDTO} request - The request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    documentName,
    recipientEmail,
    approverEmail,
    libraryDocumentId,
    ...dynamicBody
  }: ISendAgreementRequestDTO): Promise<IResponseDTO> {
    const agreementsApiInstance = new SwaggerJsClient.AgreementsApi();

    const agreementInfo = new SwaggerJsClient.AgreementCreationInfo();
    const mergeFieldInfo = Object.keys(dynamicBody).map((item) => ({ fieldName: item, defaultValue: dynamicBody[item]}))

    agreementInfo.fileInfos = [
      {
        libraryDocumentId: libraryDocumentId,
      },
    ];
    agreementInfo.name = documentName;
    agreementInfo.mergeFieldInfo = mergeFieldInfo;
    agreementInfo.participantSetsInfo = [
      {
        order: 1,
        role: AgreementRole.APPROVER,
        memberInfos: [{ email: approverEmail }],
      },
      {
        order: 2,
        role: AgreementRole.SIGNER,
        memberInfos: [{ email: recipientEmail }],
      },
    ];
    agreementInfo.signatureType = AgreementSignatureType.ESIGN;
    agreementInfo.state = AgreementState.IN_PROCESS;

    try {
      const result = await agreementsApiInstance.createAgreement(
        this.adobeAcrobatKey,
        agreementInfo,
        {}
      );
      const agreement = new Agreement({
        id: result.id,
        approver: approverEmail,
        recipient: recipientEmail,
        fileName: "",
      });

      await this.agreementRepository.create(agreement);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: { error: error } };
    }
  }
}
