import { IsMongoId, IsString, IsDateString } from "class-validator";
import { ObjectId } from "mongodb";

export class CreateBlogDto {

    @IsMongoId()
    categoryId: ObjectId;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    content: string;

    @IsDateString()
    blog_date: Date;

    @IsString()
    meta_title: string;

    @IsString()
    meta_desc: string;

    @IsString()
    meta_keyword: string;



}

