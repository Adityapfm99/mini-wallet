import {
  Controller,
  Post,
  HttpStatus,
  UnauthorizedException,
  Headers,
  HttpException,
  Patch,
  Get,
  Body,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { disableDto } from '../register/dto';

@ApiTags('Wallet')
@Controller('v1/wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async getWallet(@Headers('Authorization') token = ''): Promise<any> {
    let bearer: string = '';
    let response;
    if (typeof token != 'undefined') {
      bearer = token.replace('Bearer ', '');
    }

    if (bearer === '') {
      throw new UnauthorizedException('No Token provided!');
    }
    let getCustomer;
    const isValid = await this.isTokenValid(bearer);
    if (isValid) {
      const verifyOptions = { secret: this.configService.get('JWT_SECRET') };
      const customerXid = await this.jwtService.verify(
        bearer,
        verifyOptions,
      );

      const payload = customerXid.customerXid.customerXid;

      getCustomer = await this.walletService.findOne(payload);
    }
    if (!isValid) {
      throw new UnauthorizedException('Invalid Token!');
    }
    if (getCustomer.status == 'enable') {
      response = {
        status: 'success',
        data: {
          wallet: {
            id: getCustomer.id,
            ownedBy: getCustomer.ownedBy,
            status: getCustomer.status,
            customerXid: getCustomer.customerXid,
            enable: getCustomer.enable,
            enableAt: getCustomer.enableAt,
            balance: getCustomer.balance,
          },
        },
      };
    } else {
      throw new UnauthorizedException('Yout status wallet is Disable, Please enable, if you want to add, or use its virtual money.');
    }

    return response;
  }

  @Post()
  async setEnableAccount(@Headers('Authorization') token = ''): Promise<any> {
    let bearer: string = '';
    let response;
    if (typeof token != 'undefined') {
      bearer = token.replace('Bearer ', '');
    }

    if (bearer === '') {
      throw new UnauthorizedException('No Token provided!');
    }
    let setEnable;
    let getCust;
    let isEnable = true;
    const isValid = await this.isTokenValid(bearer);
    if (isValid) {
      const verifyOptions = { secret: this.configService.get('JWT_SECRET') };
      const customerXid = await this.jwtService.verifyAsync(
        bearer,
        verifyOptions,
      );
      const payload = customerXid.customerXid.customerXid;
      setEnable = await this.walletService.update(payload, isEnable);
      getCust = await this.walletService.findOne(payload);
      
    }
    if (!isValid) {
      throw new UnauthorizedException('Invalid Token!');
    }
    if (getCust.status == 'enable') {
      response = {
        data: {
          tokent: getCust.id,
        },
        status: 'success',
      };
    } else {
      throw new UnauthorizedException('Your status wallet is Disable, Please enable, if you want to add, or use its virtual money.');
    }

    return response;
  }

  @Patch()
  async setDisableAccount(
    @Headers('Authorization') token = '',
    @Body() isDisable: disableDto,
  ): Promise<any> {
    let bearer: string = '';
    let response;
    if (typeof token != 'undefined') {
      bearer = token.replace('Bearer ', '');
    }

    if (bearer === '') {
      throw new UnauthorizedException('No Token provided!');
    }
    let setDisable;
    let getCust;
    const isValid = await this.isTokenValid(bearer);
    if (isValid) {
      const verifyOptions = { secret: this.configService.get('JWT_SECRET') };
      const customerXid = await this.jwtService.verifyAsync(
        bearer,
        verifyOptions,
      );
      let isEnable = false;
      const payload = customerXid.customerXid.customerXid;
      
      setDisable = await this.walletService.update(payload, isEnable);
      getCust = await this.walletService.findOne(payload);
      
    }

    if (!isValid) {
      throw new UnauthorizedException('Invalid Token!');
    }
    if (getCust.status == 'disable') {
      response = {
        status: 'disable set successfully',
        data: {
          wallet: {
            id: getCust.id,
            ownedBy: getCust.ownedBy,
            status: getCust.status,
            disableAt: getCust.disableAt,
            balance: getCust.balance,
          },
        },
      };
    } else {
      throw new UnauthorizedException('Your status wallet is Disable, Please enable, if you want to add, or use its virtual money.');
    }
    return response;
  }

  private async isTokenValid(bearerToken: string): Promise<boolean> {
    const verifyOptions = { secret: this.configService.get('JWT_SECRET') };
    let isValid: boolean = false;
    try {
      const customerXid = await this.jwtService.verifyAsync(
        bearerToken,
        verifyOptions,
      );

      const payload = customerXid.customerXid.customerXid;
      const cust = await this.walletService.findOne(payload);

      if (cust) {
        isValid = true;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
    return isValid;
  }
}
