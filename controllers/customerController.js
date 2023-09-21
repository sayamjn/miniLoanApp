import Customer from '../models/customer.js';
import bcrypt from 'bcrypt';

export function signIn(req, res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/customer/dashboard');    
    }

    return res.render('customer_SignIn',
    {
        title: 'Customer SignIn'
    });
}
export function signUp(req, res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/customer/dashboard');    
    }

    return res.render('customer_SignUp',{
        title: 'Customer SignUp'
    });
}

// creating new customer
export async function createCustomer(req, res)
{
    try
    {
        // console.log(req.body);
        let customer = await Customer.findOne({email: req.body.email});

        if(!customer)
        {
            if(req.body.password !== req.body.confirm_password)
            {
                req.flash('error', 'Password and confirm password should be same');
                return res.redirect('back');
            }
            else
            {
                const saltRounds = 10; // Number of salt rounds for bcrypt hashing
                const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

                // Create a new customer with the hashed password
                let newCustomer = await Customer.create(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword, // Store the hashed password
                });
                
                req.flash('success', 'New Customer registered');
                return res.redirect('/customer/sign-in');
            }
        }
        else
        {
            // console.log('user is already registered');
            req.flash('error', 'This Customer is already registered');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log('Error in creating customer :', err);
        return res.status(500).send('Internal Server Error');
    }
}

export function createSession(req, res)
{
    req.flash('success', 'Signed In Successfully');
    return res.status(200).redirect('/customer/dashboard');
}

export async function customerDashboard(req, res)
{
    try 
    {
        if(req.user)
        {   
            return res.render('customer_Dashboard',
            {
                title: "Customer Dashboard",
            });
        }
        else
        {
            return res.status(404).redirect('/customer/sign-in');
        }
    }
    catch(error)
    {
        console.log('Error in customer dashboard controller : ',error);
        return res.status(500).send("Internal Server Error");
    }
}

// destroy session 
export function destroySession(req, res)
{
    req.logout((err)=>
    {
        if(err) console.log("Error in signOut ", err);

        // console.log('SignOut successfully');
        req.flash('success', 'SignOut successfully');
        return res.redirect('/');
    });
}