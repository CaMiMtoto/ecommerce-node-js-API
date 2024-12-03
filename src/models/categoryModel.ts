import mongoose, {Document, Schema} from 'mongoose';

export interface ICategory extends Document {
    name: string;
    description: string
}

const categorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: false
    }
}, {timestamps: true});

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;