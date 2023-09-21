import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
{
    loan: 
    { 
        type: Schema.Types.ObjectId, 
        ref: 'Loan', 
        required: true 
    },
    totalAmount: 
    { 
        type: Number, 
        required: true 
    },
    remaningAmount:
    {
        type: Number, 
        required: true
    },
    totalTerm:
    {
        type: Number, 
        required: true
    },
    remaningTerm:
    {
        type: Number, 
        required: true
    },
    nextPayment:
    {
        type: Number,
        required: true,
    },
    status: 
    {
        type: String,
        enum: ['PENDING', 'PAID'],
        default: 'PENDING',
    },
    paymentDate: 
    { 
        type: String, 
        required: true 
    },
}, 
{
    timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;