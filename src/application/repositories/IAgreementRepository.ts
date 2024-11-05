import { Agreement } from "../../domain/entities";

export interface IAgreementRepository {
  create(data: Agreement): Promise<Agreement>;
  findAll(): Promise<Agreement[]>;
}
