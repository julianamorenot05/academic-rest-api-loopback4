import {Entity, model, property} from '@loopback/repository';

@model()
export class Period extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  year: number;

  @property({
    type: 'number',
    required: true,
  })
  number: number;

  @property({
    type: 'boolean',
    required: true,
  })
  current: boolean;


  constructor(data?: Partial<Period>) {
    super(data);
  }
}

export interface PeriodRelations {
  // describe navigational properties here
}

export type PeriodWithRelations = Period & PeriodRelations;
