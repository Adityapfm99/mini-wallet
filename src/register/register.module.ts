import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { JwtModule } from '@nestjs/jwt';

const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: 'secret_key',
    signOptions: {
      expiresIn: 360,
    },
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    JwtModule.registerAsync(jwtFactory),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}