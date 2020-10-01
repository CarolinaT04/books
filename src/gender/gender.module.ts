import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Gender, GenderSchema } from './entities/gender.entity';
import { GenderController } from './.../../controller/gender.controller';
import { GenderService } from './.../../services/gender.service';

@Module({
    imports: [MongooseModule.forFeature([{
        name: Gender.name,
        schema: GenderSchema
    }])],
    controllers: [GenderController],
    providers: [GenderService]

})
export class GenderModule {}
