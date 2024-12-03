// models/Tag.ts

import mongoose, { Document, Schema } from 'mongoose';

interface ITag extends Document {
    name: string;
}

const tagSchema = new Schema<ITag>({
    name: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate tags
    },
});

const Tag = mongoose.model<ITag>('Tag', tagSchema);
export default Tag;
