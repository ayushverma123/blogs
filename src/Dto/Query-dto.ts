import {IsString,  IsDateString, IsNumber, IsOptional } from "class-validator";

export class GetQueryDto {

@IsString()
@IsOptional()
search?: string;

@IsNumber()
@IsOptional()
limit?: number;

@IsNumber()
@IsOptional()
pageNumber: number;

@IsNumber()
@IsOptional()
pageSize: number;

@IsDateString()
@IsOptional()
fromDate: Date;

@IsDateString()
@IsOptional()
toDate: Date;

@IsString()
title: string;

@IsString()
description: string;

@IsString()
content: string;

@IsString()
meta_title: string;

@IsString()
meta_desc: string;

@IsString()
meta_keyword: string;

@IsDateString()
blog_date: Date;


}