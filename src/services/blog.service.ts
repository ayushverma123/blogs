import { ICategory } from 'src/Dto/category.schema';
import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBlog } from '../Dto/blog.schema';
import { CreateBlogDto } from '../Dto/create-blog.dto';
import { GetQueryDto } from 'src/Dto/Query-dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<IBlog>,
    @InjectModel('Category') private readonly categoryModel: Model<ICategory>,) { }

  async createBlog(createBlogDto: CreateBlogDto): Promise<IBlog> {
    const { categoryId, ...blogData } = createBlogDto;
    const category = await this.categoryModel.findById(categoryId);
    if (!category) {
      throw new Error('Invalid categoryId');
    }
    const newBlogData = {
      ...blogData,
      categoryId: category._id,
      category: category.title,
    };
    const createdBlog = new this.blogModel(newBlogData);
    return createdBlog.save();
  }

  async getFilteredBlogs(queryDto: GetQueryDto): Promise<IBlog[]> {
    const { search, limit, pageNumber, pageSize, fromDate, toDate} = queryDto;
    const query = this.blogModel.find();

    if (search) {
      query.or([
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { meta_title: { $regex: search, $options: 'i' } },
        { meta_desc: { $regex: search, $options: 'i' } },
        { meta_keyword: { $regex: search, $options: 'i' } },
      ]);
    }

    if (pageNumber && pageSize) {
      const skip = (pageNumber - 1) * pageSize;
      query.skip(skip).limit(pageSize);
    }

    if (fromDate && toDate) {
      query.where({
        blog_date: {
          $gte: new Date(fromDate),
          $lte: new Date(toDate),
        },
      });
    }
  
    return query.exec();
  
  }

 
  async getAllBlogs(): Promise<IBlog[]> {
    return this.blogModel.aggregate([
      {
        $lookup: {
          from: 'categories', // Replace 'categories' with the actual collection name of your categories
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          content: 1,
          blog_date: 1,
          meta_title: 1,
          meta_desc: 1,
          meta_keyword: 1,
          category: '$category.title',
        },
      },
    ]).exec();
  }

  async getBlogById(id: string): Promise<IBlog | null> {
    return this.blogModel.findById(id).exec();
  }

  async updateBlog(id: string, updateBlogDto: CreateBlogDto): Promise<IBlog | null> {
    return this.blogModel.findByIdAndUpdate(id, updateBlogDto, { new: true }).exec();
  }

  async deleteBlog(id: string): Promise<IBlog | null> {
    return this.blogModel.findByIdAndDelete(id).exec();
  }
}



