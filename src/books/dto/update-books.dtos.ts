import { CreateBooksDto } from "./create-books.dto";
import {PartialType} from '@nestjs/mapped-types';

export declare class UpdateBooksDto  extends PartialType(CreateBooksDto) {}
