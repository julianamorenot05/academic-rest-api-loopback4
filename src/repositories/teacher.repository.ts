import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Teacher, TeacherRelations} from '../models';

export class TeacherRepository extends DefaultCrudRepository<
  Teacher,
  typeof Teacher.prototype.id,
  TeacherRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Teacher, dataSource);
  }
}
