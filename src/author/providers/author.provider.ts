import { AUTHOR_MODEL, DATABASE_CONNECTION } from "src/shared/constants/constants";
import { AuthorSchema } from "../schema/author.schema";
import { Connection } from "mongoose";

export const authorProviders = [
    {
        provide: AUTHOR_MODEL,
        useFactory: ( connection: Connection) => connection.model('Author', AuthorSchema),
        inject: [DATABASE_CONNECTION],
    },
];