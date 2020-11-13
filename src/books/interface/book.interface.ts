import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export interface Book extends Document {
    
    title: string;
    publishDate: Date;
    isbn: string;
    gender: string;
    author: string;
    editorial: string;

}