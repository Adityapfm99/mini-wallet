import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema, Wallet } from './schemas/wallet.schema';
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
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalletSchema },
    ]),
    JwtModule.registerAsync(jwtFactory),
  ],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}