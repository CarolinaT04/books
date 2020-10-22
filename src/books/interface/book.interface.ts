import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export class Book extends Document {
    @Prop()
    title: string;

    @Prop()
    publishDate: Date;

    @Prop()
    isbn: string;

    @Prop(String)
    gender: string;

    @Prop(String)
    author: string;

    @Prop(String)
    editorial: string;

}