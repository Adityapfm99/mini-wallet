import { Module } from '@nestjs/common';
import { CustomersService } from './wallet.service';
import { WithdrawalsController } from './withdrawals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositSchema, Deposit } from './schemas/deposit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Deposit.name, schema: DepositSchema },
    ]),
  ],
  providers: [CustomersService],
  controllers: [WithdrawalsController],
})
export class WithdrawalsModule {}
