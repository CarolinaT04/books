import { Provider } from "@nestjs/common";
import { DATABASE_CONNECTION } from "src/shared/constants/constants";
import * as mongoose from "mongoose";


export const DatabaseProvider: Provider = {
    provide: DATABASE_CONNECTION,
    useFactory : async(): Promise<typeof mongoose> =>
    await mongoose.connect(process.env.DB_HOST),

};