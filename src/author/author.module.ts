import { Module } from '@nestjs/common';
import { AuthorService } from './services/author.service';
import { AuthorController } from './controller/author.controller';;
import { ConfigModule } from 'src/config/config.module';
import { authorProviders } from './providers/author.provider';
import { AuthorRepository } from './repository/author.repository';

@Module({
  imports: [ConfigModule],
  providers: [...authorProviders, AuthorService, AuthorRepository],
  controllers: [AuthorController],
  exports: [AuthorRepository, AuthorService]
})
export class AuthorModule {}
