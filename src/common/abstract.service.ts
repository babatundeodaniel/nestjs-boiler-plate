import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { paginatedResult } from './paginated-result.interface';

@Injectable()
export abstract class AbstractService {
  constructor(protected readonly respository: Repository<any>) {}

  async create(data: any): Promise<any> {
    return this.respository.save(data);
  }

  async findAll(
    relations?: Array<string>,
    query?: any,
    order?: any,
  ): Promise<any[]> {
    let data: any;

    if (relations) {
      data = await this.respository.find({
        where: query,
        order: { ...order, createdAt: 'DESC' },
        relations: relations,
      });
    } else {
      data = await this.respository.find({ order: { createdAt: 'DESC' } });
    }
    return data;
  }

  async paginate(
    page = 1,
    per_page: number,
    query?: any,
    relations?: any,
  ): Promise<paginatedResult> {
    const take = per_page || 15;

    const [data, total] = await this.respository.findAndCount({
      order: { createdAt: 'DESC' },
      where: query ? query : null,
      relations: relations ? relations : null,
      take,
      skip: (page - 1) * take,
    });

    return {
      data: data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async findOne(condition: any, relations?: Array<string>): Promise<any> {
    let data: any;

    if (relations) {
      data = await this.respository.findOne(condition, {
        relations: relations,
      });
    } else {
      data = await this.respository.findOne(condition);
    }
    return data;
  }

  async update(id: number, data: any): Promise<any> {
    await this.respository.update(id, data);
    return await this.respository.findOne(id);
  }

  async remove(id: number) {
    return await this.respository.delete(id);
  }
}
