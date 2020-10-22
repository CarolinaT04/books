import * as mongoose from 'mongoose';

export const GenderSchema =  new mongoose.Schema( 
    {
    
        description:{
        type: String,
    }
   
},
{ timestamps: true });

GenderSchema.index({description: 1 }, {unique: false, dropDups: true});