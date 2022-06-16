import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Health Check')
@Controller('check')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('')
  Health(): string {
    return this.appService.healthyCheck();
  }
  
}

