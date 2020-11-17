import * as mongoose from 'mongoose';


export const EditorialSchema = new mongoose.Schema (
    {
    
    
    name: {
       type: String,
       required: true
       
    },
    address: {
       type: String,
       required: true
      
    },

  
    email: {
       type: String,
       required: true
    },

},
{timestamps:true}
);

EditorialSchema.index({ name: 1 }, { unique: false, dropDups: true });
