import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Author extends Document {
    @Prop()
    name: string;

    @Prop()
    lastName: string;

}
