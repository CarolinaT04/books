import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './entities/author.entity';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/shared/common/dto/pagination-query.dto';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

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

   async findOne( id: string){
        const author = await this.authorModel.findById(id);
        return author;
    }

    create(createAuthorDto: CreateAuthorDto){
      const author = new this.authorModel(createAuthorDto);
      return author.save();
    }
  async update(id: string , updateAuthorDto: UpdateAuthorDto){
      const author = (await this.authorModel.findByIdAndUpdate({_id: id}, {$set: updateAuthorDto}, {new : true}));
      return author;
    }
 async delete(id: string){
     const author = await this.authorModel.findByIdAndDelete(id);
     return author;

 }
}
