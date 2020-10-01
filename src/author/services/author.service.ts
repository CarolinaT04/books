import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from '../entities/author.entity';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/shared/common/dto/pagination-query.dto';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';

@Injectable()
export class AuthorService {
    constructor(@InjectModel(Author.name) private readonly authorModel: Model<Author>){
 
    }

    findAll(paginationQueryDto: PaginationQueryDto){
        const { limit , offset} = paginationQueryDto;

        return this.authorModel
        .find()
        .skip(offset) 
        .limit(limit)
        .exec();
    }

   async findOne( id: string): Promise<Author>{
        const author = (await this.authorModel.findOne({_id: id}).exec());

        if(!author) throw new NotFoundException(`Author ${id} not found`);
        return author;
    }

   async create(createAuthorDto: CreateAuthorDto): Promise<Author>{
      const author = new this.authorModel(createAuthorDto);
      return author.save();
    }
    
  async update(id: string , updateAuthorDto: UpdateAuthorDto): Promise<Author>{
      const author = await this.authorModel.findByIdAndUpdate({_id: id}, {$set: updateAuthorDto}, {new : true})
      .exec();

      if(!author) throw new NotFoundException(`Author ${id} not found`);
      return author;
    }
 async delete(id: string): Promise<Author>{
     const author = await this.findOne(id);

     if(!author) throw new NotFoundException(`Author ${id} not found`);
     return author.remove();

 }
}
