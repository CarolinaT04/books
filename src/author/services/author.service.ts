import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from '../interface/author.interface';
import { PaginationQueryDto } from 'src/shared/common/dto/pagination-query.dto';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorRepository } from '../repository/author.repository';

@Injectable()
export class AuthorService {
    constructor( private readonly authorRepository: AuthorRepository){
 
    }

  async findAll(paginationQueryDto: PaginationQueryDto): Promise<Author[]>{
     return await this.authorRepository.findAll(paginationQueryDto);
    }

   async findOne( id: string): Promise<Author>{
        const author =  await this.authorRepository.findOne(id);
        if(!author) throw new NotFoundException(`Author with ${id} provided not found`);
        return author;
    }

   async create(createAuthorDto: CreateAuthorDto): Promise<Author>{
     await this.validateName(createAuthorDto.name , createAuthorDto.lastName);
      return await this.authorRepository.create(createAuthorDto);
    
    }
    
  async update(id: string , updateAuthorDto: UpdateAuthorDto): Promise<Author>{
      const author = await this.authorRepository.update(id , updateAuthorDto);
      if(!author) throw new NotFoundException(`Author ${id} not found`);
      return author;
    }
 async delete(id: string): Promise<void>{
     return await this.authorRepository.delete(id);
 }

 // Private method

 private async validateName(name: string, lastName:string): Promise<void>{
   const author = await this.authorRepository.findAuthorName(name, lastName);
   if(author){
    const error = `There is already a Author with the name ${name}+${lastName}.`;
    throw new NotFoundException(error);
   }

 }
  
 
}
