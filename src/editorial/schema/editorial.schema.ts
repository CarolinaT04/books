import * as mongoose from 'mongoose';


export const EditorialSchema = new mongoose.Schema (
    {
    
    
    name: {
       type: String,
       
    },
    address: {
       type: String,
      
    },

  
    email: {
       type: String
    },

}
);

EditorialSchema.index({ name: 1 }, { unique: false,  });
