import {
  Injectable,

} from '@nestjs/common';
import { JwtPayload } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RegisterService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  public async init(
    loginDto: JwtPayload,
  ): Promise<any | { status: number; message: string }> {
    const payload = {
      customerXid: loginDto,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      expiresIn: 3600,
      token: accessToken,
      status: payload,
      code: 200,
    };
  }

  public async validateUserByJwt(payload: JwtPayload) {
    // const user = await this.registerService.login(payload);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return this.createJwtPayload(user);
  }

  protected createJwtPayload(customerXid) {
    const data: JwtPayload = {
      customerXid: customerXid,
    };

    const jwt = this.jwtService.sign(data);

    return {
      expiresIn: 3600,
      token: jwt,
    };
  }

}
