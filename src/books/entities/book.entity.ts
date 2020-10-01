import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
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

export const BookSchema = SchemaFactory.createForClass(Book)