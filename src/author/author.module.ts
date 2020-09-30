import { Module, Controller } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { Author, AuthorSchema } from './entities/author.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Author.name,
    schema: AuthorSchema
}])],
  providers: [AuthorService],
  controllers: [AuthorController]
})
export class AuthorModule {}