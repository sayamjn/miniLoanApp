import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const customerSchema = new Schema(
{
    name: 
    {
        type: String,
        required: true,
    },
    email: 
    {
        type: String,
        required: true,
        unique: true,
    },
    password: 
    {
        type: String,
        required: true,
    },
    loans: 
    [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Loan' 
        }
    ],
},
{
    timestamps:true
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;