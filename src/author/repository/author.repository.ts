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

   async findOne( id: string ): Promise<Author>{
       try {
        const author = (await this.authorModel.findById({ _id: id }));
        return author;
       } catch (error) {
           throw new NotFoundException(error);
           
       }
        
    }

   async create(createAuthorDto: CreateAuthorDto): Promise<Author>{
    try {
      const author = new this.authorModel(createAuthorDto);
      const result = await author.save();
      if (!result){ throw new Error('404 Author was not created');}
      return result;
    } catch (error) {
       throw new NotFoundException(error);
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
 async delete(id: string): Promise<Author>{
    try {
        const author = (await this.authorModel.findByIdAndDelete({_id: id}));
        return author;
      
    } catch (error) {
        throw new Error(error);
        
    }
     

 }
 async findAuthorName(name: string, lastName): Promise<Author>{
     try {
        const author = await this.authorModel.findOne({
            name: {
                $regex: name,
                $options: 'i',
              },
              lastName:{
                $regex: lastName,
                $options: 'i',
              }
        });
        return author;
     } catch (error) {
        throw new Error(error);
         
     }
     
        
}
}
