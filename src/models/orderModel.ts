import mongoose, {Document, Schema} from 'mongoose';

export interface IOrder extends Document {
    user: mongoose.Schema.Types.ObjectId;
    orderItems: {
        product: mongoose.Schema.Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
}

const orderSchema: Schema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        orderItems: [
            {
                product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
                quantity: {type: Number, required: true},
                price: {type: Number, required: true},
            }
        ],
        totalAmount: {type: Number, required: true},
        shippingAddress: {
            address: {type: String, required: true},
            city: {type: String, required: true},
            postalCode: {type: String, required: true},
            country: {type: String, required: true}
        },
        isPaid: {type: Boolean, default: false},
        paidAt: {type: Date},
        isDelivered: {type: Boolean, default: false},
        deliveredAt: {type: Date}
    },
    {timestamps: true}
);

const Order = mongoose.model<IOrder>('Order', orderSchema);
export default Order;
