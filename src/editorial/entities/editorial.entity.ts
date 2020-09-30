import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Editorial extends Document {
    
    @Prop()   
    name: string;

    @Prop()
    address: string;

    @Prop()
    email: string;

}

export const EditorialSchema = SchemaFactory.createForClass(Editorial)