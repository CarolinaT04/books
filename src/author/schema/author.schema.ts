import  *  as mongoose from 'mongoose';

export const AuthorSchema = new mongoose.Schema(
     {
 
        name:{
        type: String,
        required: true,
       },
       
        lastName: {
        type: String,
        required: true,
     },
     email:{
        type: String,
        required:true,
        unique:true
     }

},
{ timestamps: true });

AuthorSchema.index({ name: 1 }, { unique: false, dropDups: true });
