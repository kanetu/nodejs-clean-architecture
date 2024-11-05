import {
  AgreementModel
} from '../databases/initModels';
import BaseRepository from './baseRepository';
import { IAgreementRepository } from '../../application/repositories';
import { Agreement } from '../../domain/entities';

export default class AgreementRepository extends BaseRepository implements IAgreementRepository {

  async create(data: Agreement): Promise<Agreement> {
    return await AgreementModel.create(
      {
        id: data.id,
        approver: data.approver,
        recipient: data.recipient,
        fileName: data.fileName,
      }
    );
  }

  async findAll(): Promise<Agreement[]> {
    return await AgreementModel.findAll();
  }
 
}
