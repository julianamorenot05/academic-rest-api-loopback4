import {Entity, model, property} from '@loopback/repository';

@model()
export class Office extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  number: string;


  constructor(data?: Partial<Office>) {
    super(data);
  }
}

export interface OfficeRelations {
  // describe navigational properties here
}

export type OfficeWithRelations = Office & OfficeRelations;
