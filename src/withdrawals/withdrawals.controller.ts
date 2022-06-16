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
import { CustomersService } from './wallet.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Withdrawals')
@Controller('v1/wallet')
export class WithdrawalsController {
  constructor(private customersService: CustomersService) {}

  @Post('withdrawals')
  public async getAllCustomer(
    @Res() res,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const customers = await this.customersService.findAll(paginationQuery);
    return res.status(HttpStatus.OK).json(customers);
  }

  
}
