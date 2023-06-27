import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  title: string;
}

export const CategorySchema: Schema = new Schema({
 title: { type: String, required: true },
});

export default mongoose.model<ICategory>('Category', CategorySchema);