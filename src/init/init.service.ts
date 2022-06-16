import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InitResponse } from './interfaces/init.interface';
import { InitSchema } from './schemas/init.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { createInit } from './dto/create-init.dto';


@Injectable()
export class InitService {
  constructor(
    @InjectModel(InitSchema.name)
    private readonly initModel: Model<InitSchema>,
  ) {}

  public async create(
    payload: createInit,
  ): Promise<InitResponse> {
    const init = await this.initModel.create(
      payload,
    );
    const token = await this.Generatetoken(payload);
    return token;
  }
  public async Generatetoken(
    payload: createInit,
    ) {
    const crypto = require("crypto");
    const token = crypto.randomBytes(48).toString('hex');
    return token;
  }



}
