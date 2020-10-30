import  *  as mongoose from 'mongoose';
import { GENDER_MODEL, AUTHOR_MODEL, EDITORIAL_MODEL } from "src/shared/constants/constants";

export const BookSchema  = new mongoose.Schema(
    {

     title:{
     type: String,
     required: true,
     
    } ,

    publishDate: {
      type: Date,
     required: true
    },
    isbn: {

     type: String,
     required: false
    },
    gender: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Gender'
    },

    author:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    editorial: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: EDITORIAL_MODEL
    }

}
);

BookSchema.index({ title: 1 }, { unique: false, dropDups: true });


