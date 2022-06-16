import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Deposit extends Document {
  @Prop()
  firstName: string;

  @Prop({ unique: true })
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop({ type: [Types.ObjectId], ref: 'Organization' })
  organizations: string;
}

export const DepositSchema = SchemaFactory.createForClass(Deposit);
