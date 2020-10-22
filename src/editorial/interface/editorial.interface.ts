import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export class Editorial extends Document {
    
    @Prop()   
    name: string;

    @Prop()
    address: string;

    @Prop()
    email: string;

}