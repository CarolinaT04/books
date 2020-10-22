import { GENDER_MODEL, DATABASE_CONNECTION } from "src/shared/constants/constants";
import { Connection } from "mongoose";
import { GenderSchema } from "../schema/gender.schema";


export const genderProvider = [
    {
        provide: GENDER_MODEL,
        useFactory: (connection: Connection)=> connection.model('Gender', GenderSchema),
        inject : [DATABASE_CONNECTION],
    }
];