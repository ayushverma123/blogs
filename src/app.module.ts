

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './Dto/blog.schema'
import { CategorySchema } from './Dto/category.schema'
import { BlogService } from './services/blog.service';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controller/category.controller';
import { BlogController } from './controller/blog.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ayushv657:gkczp9LJXpkYnN7u@cluster0.stthbi5.mongodb.net/mydatabase?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }, { name: 'Category', schema: CategorySchema }]),
  ],
  providers: [BlogService, CategoryService],
  controllers:[CategoryController, BlogController],
})
export class AppModule {}
