import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const loanSchema = new Schema(
{
    customer: 
    { 
        type: Schema.Types.ObjectId, 
        ref: 'Customer', 
        required: true 
    },
    amount: 
    { 
        type: Number, 
        required: true 
    },
    term: 
    { 
        type: Number, 
        required: true 
    },
    payments: 
    [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Payment' 
        }
    ],
    status: 
    {
        type: String,
        enum: ['PENDING', 'APPROVED', 'PAID', 'REJECTED'],
        default: 'PENDING',
    },
    appliedDate:
    {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;
