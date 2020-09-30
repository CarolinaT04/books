import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Author extends Document {
    @Prop()
    name: string;

    @Prop()
    lastName: string;

}

export const AuthorSchema = SchemaFactory.createForClass(Author)