import { BOOK_MODEL, DATABASE_CONNECTION } from "src/shared/constants/constants";
import { Connection } from "mongoose";
import { BookSchema } from "../schema/book.schema";


export const booksProvider = [
 {
    provide: BOOK_MODEL,
    useFactory: (connection : Connection)=> connection.model('Books', BookSchema),
    inject: [DATABASE_CONNECTION],
 }
];