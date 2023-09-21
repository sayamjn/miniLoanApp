import Payment from '../models/payment.js';
import Loan from '../models/loan.js';

export async function loanPayment(req, res) 
{
    try 
    {
        if(req.user) 
        {
            // Find the payment associated with the loan and with status "PENDING"
            let payment = await Payment.findById({_id:req.params.paymentId, status:"PENDING"});

            if (payment) 
            {
                // Calculate the updated values
                const remaningAmount = (payment.remaningAmount - req.body.payment);
                const remaningTerm = payment.remaningTerm - 1;
                const status = (remaningAmount === 0) || (remaningTerm ===0) ? "PAID" : "PENDING";
                const paymentDate = remaningAmount === 0 ? null : payment.paymentDate;

                // Check if remaningTerm is not zero to prevent division by zero
                const nextPayment = remaningTerm !== 0 ? remaningAmount / remaningTerm : 0;
                
                // Update the payment document in the database
                const updatedPayment = await Payment.findByIdAndUpdate(payment._id, 
                {
                    remaningAmount: remaningAmount,
                    remaningTerm: remaningTerm,
                    nextPayment: nextPayment,
                    status: status,
                    paymentDate: paymentDate

                },{new: true });

                if (updatedPayment) 
                {
                    // Update the related loan document if the payment status is "PAID"
                    if (updatedPayment.status === "PAID") 
                    {
                        await Loan.findByIdAndUpdate(payment.loan, {
                            status: "PAID"
                        });    
                        req.flash('success', 'You have paid all Payments');
                        return res.redirect('back');
                    }

                    // Return the updated payment 
                    req.flash('success', 'Payment successfully done');
                    return res.redirect('back');
                } 
                else 
                {
                    req.flash('error', 'Failed to update payment');
                    return res.status(500).send("Failed to update payment");
                }
            } 
            else 
            {
                // console.log("error ", req.user);
                req.flash('error', 'Payment not found or status is not PENDING');
                return res.redirect('back');
            }
        } 
        else 
        {
            req.flash('error', 'User not authenticated');
            return res.redirect('/customer/sign-in');
        }
    } 
    catch (error) 
    {
        console.log("Error in apply loan payment controller: ", error);
        return res.status(500).send("Internal Server Error");
    }
}
