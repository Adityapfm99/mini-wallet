import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  UnauthorizedException,
  Headers,
  Query,
  HttpException,

} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { CreateInitDto } from './dto';
import { RegisterService } from './register.service';

@ApiTags('Init')
@Controller('v1/init')
export class RegisterController {
  constructor(private registerService: RegisterService,
    private configService: ConfigService,  private readonly jwtService: JwtService,) {}

  @Post()
  public async init(
    @Res() res,
    @Body() loginDto: CreateInitDto): Promise<any> {
      const login = await this.registerService.init(loginDto);
      return res.status(HttpStatus.OK).json({
        data: {
          token: login.token,
        },
        status: 'success'
      });
    
  }
}
