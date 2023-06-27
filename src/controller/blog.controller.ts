import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { CreateBlogDto } from '../Dto/create-blog.dto';
import { GetQueryDto } from 'src/Dto/Query-dto';
import { IBlog } from '../Dto/blog.schema';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  /*
  @Get('getall')
  async getAllBlogs(): Promise<IBlog[]> {
    return this.blogService.getAllBlogs();
  }
  */

  @Get('get')
  async getBlogs(
    @Query() queryDto: GetQueryDto,
  ): Promise<IBlog[]> {
    if (queryDto.search || queryDto.limit || queryDto.fromDate || queryDto.toDate || queryDto.pageNumber || queryDto.pageSize) {
      return this.blogService.getFilteredBlogs(queryDto);
    } else {
      return this.blogService.getAllBlogs();
    }
  }
  


  @Get('getbyid/:id')
  async getBlogById(@Param('id') id: string): Promise<IBlog | null> {
    return this.blogService.getBlogById(id);
  }

/*  
  @Get('filtered')
  async getFilteredBlogs(
    @Query() queryDto: GetQueryDto,
  ): Promise<IBlog[]> {
    return this.blogService.getFilteredBlogs(queryDto);
  }

  */
  



  @Post('create')
  async createBlog(@Body() createBlogDto: CreateBlogDto): Promise<IBlog>
  {
    const createdBlog=await this.blogService.createBlog(createBlogDto);
    return createdBlog;

  }

  @Put('updatebyid/:id')
  async updateBlog(
    @Param('id') id: string,
    @Body() updateBlogDto: CreateBlogDto,
  ): Promise<IBlog | null> {
    return this.blogService.updateBlog(id, updateBlogDto);
  }

  @Delete('deletebyid/:id')
  async deleteBlog(@Param('id') id: string): Promise<IBlog | null> {
    return this.blogService.deleteBlog(id);
  }
}
 
