import { PartialType } from '@nestjs/swagger';
import { createInit } from './create-init.dto';

export class UpdateInitDto extends PartialType(createInit) {}
