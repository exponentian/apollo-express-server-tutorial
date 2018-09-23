import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    text: String,
    user: String
  }
);

export default mongoose.model('Article', ArticleSchema);