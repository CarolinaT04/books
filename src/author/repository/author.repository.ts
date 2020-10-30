import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Author } from '../interface/author.interface';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/shared/common/dto/pagination-query.dto';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AUTHOR_MODEL } from 'src/shared/constants/constants';

@Injectable()
export class AuthorRepository {
    constructor(@Inject(AUTHOR_MODEL) private readonly authorModel: Model<Author>){
 
    }

   async findAll(paginationQueryDto: PaginationQueryDto): Promise<Author[]>{
        const { limit , offset} = paginationQueryDto;

        return this.authorModel
        .find()
        .skip(offset) 
        .limit(limit)
        .exec();
    }

   async findOne( id: string): Promise<Author>{
       try {
        const author = (await this.authorModel.findOne({_id: id}).exec());
        return author;
       } catch (error) {
           console.log(error);
           
       }
        
    }

   async create(createAuthorDto: CreateAuthorDto): Promise<Author>{
    try {
      const author = new this.authorModel(createAuthorDto);
      const result = await author.save();
      if (!result){ throw new Error('404 Author was not created');}
      return result;
    } catch (error) {
        console.log(error); 
    } 
    }
    
  async update(id: string , updateAuthorDto: UpdateAuthorDto): Promise<Author>{
    try {
      const author = await this.authorModel.findByIdAndUpdate({_id: id}, {$set: updateAuthorDto}, {new : true})
      .exec();
      return author.toObject();
    } catch (error) {
        console.log(error);
        
    }  
    
    }
 async delete(id: string): Promise<void>{
    try {
        const author = (await this.authorModel.deleteOne({_id: id})).deletedCount;

        if(author<= 0) throw new NotFoundException(`Author ${id} not found`);
      
    } catch (error) {
        throw new Error(error);
        
    }
     

 }
 async findAuthorName(name: string): Promise<Author>{
     try {
        const author = await this.authorModel.findOne({
            name: {
                $regex: name,
                $options: 'i',
              },
        });
        return author;
     } catch (error) {
         console.log(error);
         
     }
     
        
}
}
