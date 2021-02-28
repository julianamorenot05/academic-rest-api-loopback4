import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Office, OfficeRelations} from '../models';

export class OfficeRepository extends DefaultCrudRepository<
  Office,
  typeof Office.prototype.id,
  OfficeRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Office, dataSource);
  }
}
