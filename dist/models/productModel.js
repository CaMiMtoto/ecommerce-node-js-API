"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define a schema for variant options (e.g., "Size", "Color")
const variantOptionSchema = new mongoose_1.Schema({
    name: { type: String, required: true }, // e.g., "Size", "Color"
    value: { type: String, required: true }, // e.g., "Medium", "Red"
});
// Define a schema for a combination of variant options
const variantCombinationSchema = new mongoose_1.Schema({
    options: [variantOptionSchema], // e.g., [{name: "Size", value: "Medium"}, {name: "Color", value: "Red"}]
    price: { type: Number, required: true }, // Price specific to this combination
    stock: { type: Number, required: false, default: 0 }, // Stock specific to this combination
});
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    stock: { type: Number, required: false, default: 0 },
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Category', required: true },
    imageUrl: { type: String, required: true },
    variants: [variantCombinationSchema], // Array of variants
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Tag' }], // Array of tags (e.g., ["new", "sale"])
}, { timestamps: true });
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
