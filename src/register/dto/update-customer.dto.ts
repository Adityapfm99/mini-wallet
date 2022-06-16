import { PartialType } from '@nestjs/swagger';
import { CreateInitDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateInitDto) {}
