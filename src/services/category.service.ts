import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from '../Dto/category.schema';
import { CreateCategoryDto } from '../Dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<ICategory>) {}

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async getAllCategories(): Promise<ICategory[]> {
    return this.categoryModel.find().exec();
  }

  async getCategoryById(id: string): Promise<ICategory | null> {
    return this.categoryModel.findById(id).exec();
  }

  async getFilteredBlogs(
    sortBy: string,
    filterCriteria: any,
    pageNumber: number,
    pageSize: number
  ): Promise<ICategory[]> {
    const skip = (pageNumber - 1) * pageSize;
    const limit = pageSize;

    const query = this.categoryModel.find(filterCriteria)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .exec();

    return query;
  }

  async updateCategory(id: string, updateCategoryDto: CreateCategoryDto): Promise<ICategory | null> {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
  }

  async deleteCategory(id: string): Promise<ICategory | null> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}