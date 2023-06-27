import { Controller, Get, Post, Put, Delete, Param, Body , Query} from '@nestjs/common';
import { CategoryService } from 'src/services/category.service';
import { CreateCategoryDto } from '../Dto/create-category.dto';
import { ICategory } from '../Dto/category.schema';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('getall')
  async getAllCategories(): Promise<ICategory[]> {
    return this.categoryService.getAllCategories();
  }

  @Get('getbyid/:id')
  async getCategoryById(@Param('id') id: string): Promise<ICategory | null> {
    return this.categoryService.getCategoryById(id);
  }

  @Get('filtered')
  async getFilteredBlogs(
    @Query('sortBy') sortBy: string,
    @Query('filterCriteria') filterCriteria: string,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ): Promise<ICategory[]> {
    const parsedFilterCriteria = JSON.parse(filterCriteria);
    return this.categoryService.getFilteredBlogs(sortBy, parsedFilterCriteria, pageNumber, pageSize);
  }

  @Post('create')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put('updatebyid/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ): Promise<ICategory | null> {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete('deletebyid/:id')
  async deleteCategory(@Param('id') id: string): Promise<ICategory | null> {
    return this.categoryService.deleteCategory(id);
  }
}