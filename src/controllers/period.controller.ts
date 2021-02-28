import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Period} from '../models';
import {PeriodRepository} from '../repositories';

export class PeriodController {
  constructor(
    @repository(PeriodRepository)
    public periodRepository : PeriodRepository,
  ) {}

  @post('/period')
  @response(200, {
    description: 'Period model instance',
    content: {'application/json': {schema: getModelSchemaRef(Period)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Period, {
            title: 'NewPeriod',
            exclude: ['id'],
          }),
        },
      },
    })
    period: Omit<Period, 'id'>,
  ): Promise<Period> {
    return this.periodRepository.create(period);
  }

  @get('/period/count')
  @response(200, {
    description: 'Period model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Period) where?: Where<Period>,
  ): Promise<Count> {
    return this.periodRepository.count(where);
  }

  @get('/period')
  @response(200, {
    description: 'Array of Period model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Period, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Period) filter?: Filter<Period>,
  ): Promise<Period[]> {
    return this.periodRepository.find(filter);
  }

  @patch('/period')
  @response(200, {
    description: 'Period PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Period, {partial: true}),
        },
      },
    })
    period: Period,
    @param.where(Period) where?: Where<Period>,
  ): Promise<Count> {
    return this.periodRepository.updateAll(period, where);
  }

  @get('/period/{id}')
  @response(200, {
    description: 'Period model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Period, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Period, {exclude: 'where'}) filter?: FilterExcludingWhere<Period>
  ): Promise<Period> {
    return this.periodRepository.findById(id, filter);
  }

  @patch('/period/{id}')
  @response(204, {
    description: 'Period PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Period, {partial: true}),
        },
      },
    })
    period: Period,
  ): Promise<void> {
    await this.periodRepository.updateById(id, period);
  }

  @put('/period/{id}')
  @response(204, {
    description: 'Period PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() period: Period,
  ): Promise<void> {
    await this.periodRepository.replaceById(id, period);
  }

  @del('/period/{id}')
  @response(204, {
    description: 'Period DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.periodRepository.deleteById(id);
  }
}
