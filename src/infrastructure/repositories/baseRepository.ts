import { Sequelize } from 'sequelize';
import {
  initModels,
} from '../databases/initModels';

export default class BaseRepository {
  private readonly db: Sequelize;

  constructor(config: any) {
    this.db = new Sequelize({
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      dialect: 'mysql',
      dialectModule: require('mysql2'),
    });
    initModels(this.db);
  }
}
