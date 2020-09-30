import { CreateBooksDto } from "./create-books.dto";
import {PartialType} from '@nestjs/mapped-types';

export class UpdateBooksDto  extends PartialType(CreateBooksDto) {}
