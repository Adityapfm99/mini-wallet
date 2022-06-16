import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { InitService } from './init.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { createInit } from '../init/dto/create-init.dto';

@ApiTags('Init Walet')
@Controller('v1')
export class InitController {
  constructor(private readonly initService: InitService) {}

  @Post()
  public async create(
    @Res() res,
    @Body() createInitDto: createInit,
  ) {
    try {
      const init = await this.initService.create(createInitDto);
      return res.status(HttpStatus.OK).json({
        data: {
          token: '',
        },
        status: 'success',
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: init not created!',
        status: 400,
      });
    }
  }
}
