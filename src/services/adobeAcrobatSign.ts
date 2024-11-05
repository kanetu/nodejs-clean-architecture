import { AxiosInstance } from "axios";

const endPoints = {
    getAgreement: "/agreements/{{agreementId}}",
    getLibraryDocumentFormFields: "/libraryDocuments/{{libraryDocumentId}}/formFields",
    getAgreementAuditTrail: "/agreements/{{agreementId}}/auditTrail",
    getCombinedDocument:
      "/agreements/{{agreementId}}/combinedDocument",
}

const getAgreementService = (axiosInstance: AxiosInstance, agreementId: string) => {
    return axiosInstance.get(endPoints.getAgreement.replace("{{agreementId}}", agreementId))
}

const getLibraryDocumentFormFieldsService = (axiosInstance: AxiosInstance, libraryDocumentId: string) => {
    return axiosInstance.get(endPoints.getLibraryDocumentFormFields.replace("{{libraryDocumentId}}", libraryDocumentId))
}


const downloadAgreementService = (
    axiosInstance: AxiosInstance,
    agreementId: string
  ) => {
    return axiosInstance.get(
      endPoints.getCombinedDocument.replace(
        "{{agreementId}}",
        agreementId
      )
    );
  };

  const getAgreementAuditTrailService = (
    axiosInstance: AxiosInstance,
    agreementId: string
  ) => {
    return axiosInstance.get(
      endPoints.getAgreementAuditTrail.replace("{{agreementId}}", agreementId)
    );
  };

export default { getAgreementService, getLibraryDocumentFormFieldsService, downloadAgreementService, getAgreementAuditTrailService }