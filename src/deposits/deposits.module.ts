import { Module } from '@nestjs/common';
import { DepositService } from './deposits.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositsController } from './deposits.controller';
import { DepositSchema, Deposit } from './schemas/deposit.schema';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: 'secret-key',
    signOptions: {
      expiresIn: 600000,
    },
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Deposit.name, schema: DepositSchema },
    ]),
    JwtModule.registerAsync(jwtFactory),
  ],
  providers: [DepositService],
  controllers: [DepositsController],
})
export class DepositsModule {}