import { Request, Response, Router } from "express";

import { expressAdapter } from "../../adapters/express";
import { getAgreementTemplatesComposer } from "../../../infrastructure/services/agreement/getAgreementTemplates";
import { sendAgreementComposer } from "../../../infrastructure/services/agreement/sendAgreement";
import { downloadAgreementComposer } from "../../../infrastructure/services/agreement/downloadAgreement";
import { getAgreementsComposer } from "../../../infrastructure/services/agreement/getAgreements";
import { getAgreementComposer } from "../../../infrastructure/services/agreement/getAgreement";
import { getAgreementAuditComposer } from "../../../infrastructure/services/agreement/getAgreementAudit";
import { getAgreementTemplateFormFieldsComposer } from "../../../infrastructure/services/agreement/getAgreementTemplateFormFields";

const agreementRoutes = Router();

agreementRoutes.get(
  "/templates",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(
      request,
      getAgreementTemplatesComposer()
    );
    return response.status(adapter.statusCode).json(adapter.body);
  }
);

agreementRoutes.get(
  "/templates/:libraryDocumentId",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(
      request,
      getAgreementTemplateFormFieldsComposer()
    );
    return response.status(adapter.statusCode).json(adapter.body);
  }
);

agreementRoutes.post(
  "/sendAgreement",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, sendAgreementComposer());
    return response.status(adapter.statusCode).json(adapter.body);
  }
);
agreementRoutes.get(
  "/download/:agreementId",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, downloadAgreementComposer());
    return response.status(adapter.statusCode).send(adapter.body);
  }
);

agreementRoutes.get("/", async (request: Request, response: Response) => {
  const adapter = await expressAdapter(request, getAgreementsComposer());
  return response.status(adapter.statusCode).json(adapter.body);
});

agreementRoutes.get(
  "/:agreementId",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAgreementComposer());
    return response.status(adapter.statusCode).json(adapter.body);
  }
);

agreementRoutes.get(
  "/:agreementId/audit",
  async (request: Request, response: Response) => {
    const adapter = await expressAdapter(request, getAgreementAuditComposer());
    return response
      .contentType("application/pdf")
      .status(adapter.statusCode)
      .send(adapter.body);
  }
);

export { agreementRoutes };
