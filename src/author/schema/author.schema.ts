import  *  as mongoose from 'mongoose';

export const AuthorSchema = new mongoose.Schema(
     {
 
        name:{
        type: String,
        required: false,
       },
       
        lastName: {
        type: String,
        required: false,
     }

}
);

AuthorSchema.index({ name: 1 }, { unique: false, dropDups: true });
