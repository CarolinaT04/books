import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export interface Editorial extends Document {
      
    name: string;
    address: string;
    email: string;

}