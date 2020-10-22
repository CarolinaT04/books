import { Module, Controller } from '@nestjs/common';
import { AuthorService } from './services/author.service';
import { AuthorController } from './controller/author.controller';
import { AuthorSchema } from './schema/author.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Author } from './interface/author.interface';
import { ConfigModule } from 'src/config/config.module';
import { authorProviders } from './providers/author.provider';

@Module({
  imports: [ConfigModule],
  providers: [...authorProviders, AuthorService],
  controllers: [AuthorController]
})
export class AuthorModule {}
