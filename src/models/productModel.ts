import mongoose, {Document, Schema} from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: mongoose.Schema.Types.ObjectId;
    imageUrl: string;
    tags: mongoose.Types.ObjectId[]; // Reference to tags in the Tag model
}

// Define a schema for variant options (e.g., "Size", "Color")
const variantOptionSchema = new Schema({
    name: {type: String, required: true}, // e.g., "Size", "Color"
    value: {type: String, required: true}, // e.g., "Medium", "Red"
});
// Define a schema for a combination of variant options
const variantCombinationSchema = new Schema({
    options: [variantOptionSchema], // e.g., [{name: "Size", value: "Medium"}, {name: "Color", value: "Red"}]
    price: {type: Number, required: true}, // Price specific to this combination
    stock: {type: Number, required: false, default: 0}, // Stock specific to this combination
});
const productSchema: Schema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: false},
        price: {type: Number, required: true},
        stock: {type: Number, required: false, default: 0},
        category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
        imageUrl: {type: String, required: true},
        variants: [variantCombinationSchema], // Array of variants
        tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}], // Array of tags (e.g., ["new", "sale"])
    },
    {timestamps: true}
);

const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;
