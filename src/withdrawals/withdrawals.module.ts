import { Module } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WithdrawalsController} from './withdrawals.controller';
import { WithdrawalsSchema, Withdrawals } from './schemas/withdrawals.schema';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: 'aaaaaaaaa',
    
    signOptions: {
      expiresIn: 3000,
    },
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Withdrawals.name, schema: WithdrawalsSchema },
    ]),
    JwtModule.registerAsync(jwtFactory),
  ],
  providers: [WithdrawalsService],
  controllers: [WithdrawalsController],
})
export class WithdrawalsModule {}