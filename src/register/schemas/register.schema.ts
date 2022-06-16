import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop()
  customerXid: string;

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
