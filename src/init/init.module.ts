import { Module } from '@nestjs/common';
import { InitController } from './init.controller';
import { InitService } from './init.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  InitSchema,
} from './schemas/init.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InitSchema.name, schema: InitSchema },
    ]),
  ],
  controllers: [InitController],
  providers: [InitService],
})
export class InitModule {}
