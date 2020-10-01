import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Gender extends Document {
    @Prop()
    name: string;

}

export const GenderSchema = SchemaFactory.createForClass(Gender);