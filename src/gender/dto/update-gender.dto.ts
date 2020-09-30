import { CreateGenderDto } from "./create-gender.dto";
import {PartialType} from '@nestjs/mapped-types';

export class UpdateGenderDto  extends PartialType(CreateGenderDto) {}