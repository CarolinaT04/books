import { EDITORIAL_MODEL, DATABASE_CONNECTION } from "src/shared/constants/constants";
import { connection, Connection } from "mongoose";
import { EditorialSchema } from "../schema/editorial.schema";



export const editorialProvider = [
    {
        provide: EDITORIAL_MODEL,
        useFactory: ( connection: Connection)=> connection.model('Editorial', EditorialSchema),
        inject: [DATABASE_CONNECTION],
    }
];