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
import {Office} from '../models';
import {OfficeRepository} from '../repositories';

export class OfficeController {
  constructor(
    @repository(OfficeRepository)
    public officeRepository : OfficeRepository,
  ) {}

  @post('/office')
  @response(200, {
    description: 'Office model instance',
    content: {'application/json': {schema: getModelSchemaRef(Office)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Office, {
            title: 'NewOffice',
            exclude: ['id'],
          }),
        },
      },
    })
    office: Omit<Office, 'id'>,
  ): Promise<Office> {
    return this.officeRepository.create(office);
  }

  @get('/office/count')
  @response(200, {
    description: 'Office model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Office) where?: Where<Office>,
  ): Promise<Count> {
    return this.officeRepository.count(where);
  }

  @get('/office')
  @response(200, {
    description: 'Array of Office model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Office, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Office) filter?: Filter<Office>,
  ): Promise<Office[]> {
    return this.officeRepository.find(filter);
  }

  @patch('/office')
  @response(200, {
    description: 'Office PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Office, {partial: true}),
        },
      },
    })
    office: Office,
    @param.where(Office) where?: Where<Office>,
  ): Promise<Count> {
    return this.officeRepository.updateAll(office, where);
  }

  @get('/office/{id}')
  @response(200, {
    description: 'Office model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Office, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Office, {exclude: 'where'}) filter?: FilterExcludingWhere<Office>
  ): Promise<Office> {
    return this.officeRepository.findById(id, filter);
  }

  @patch('/office/{id}')
  @response(204, {
    description: 'Office PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Office, {partial: true}),
        },
      },
    })
    office: Office,
  ): Promise<void> {
    await this.officeRepository.updateById(id, office);
  }

  @put('/office/{id}')
  @response(204, {
    description: 'Office PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() office: Office,
  ): Promise<void> {
    await this.officeRepository.replaceById(id, office);
  }

  @del('/office/{id}')
  @response(204, {
    description: 'Office DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.officeRepository.deleteById(id);
  }
}
