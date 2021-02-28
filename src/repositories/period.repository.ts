import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Period, PeriodRelations} from '../models';

export class PeriodRepository extends DefaultCrudRepository<
  Period,
  typeof Period.prototype.id,
  PeriodRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Period, dataSource);
  }
}
