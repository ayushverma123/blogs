import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { IsString, IsDateString } from 'class-validator';

export interface IBlog extends Document {
  title: string;
  description: string;
  content: string;
  blog_date: Date;
  meta_title: string;
  meta_desc: string;
  meta_keyword: string;
  category: string;
  
  

   // Reference to Category model using independent ID
}

export const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  blog_date: { type: Date, required: true },
  meta_title: { type: String, required: true },
  meta_desc: { type: String, required: true },
  meta_keyword: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category',},
  category: { type: String },
  
  // Reference to Category model using independent ID
});


export default mongoose.model<IBlog>('Blog', BlogSchema);
