import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class InitSchema extends Document {
  @Prop({ unique: true })
  customerXid: string;

  @Prop()
  token: string;

}

export const initSchema = SchemaFactory.createForClass(InitSchema);
