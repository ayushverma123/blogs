import { IsString, IsNumber } from "class-validator";


export class CreateCategoryDto{

    @IsString()
    title: string;

}