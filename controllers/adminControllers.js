import Admin from '../models/admin.js';
import Loan from '../models/loan.js';
import bcrypt from 'bcrypt';


export function signIn(req, res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/admin/dashboard');    
    }
    return res.render('admin_SignIn',{
        title: 'Admin SignIn'
    });
}
export function signUp(req, res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/admin/dashboard');    
    }

    return res.render('admin_SignUp',{
        title: 'Admin SignUp'
    });
}

// creating new admin
export async function createAdmin(req, res)
{
    try
    {
        // console.log(req.body);
        let admin = await Admin.findOne({email: req.body.email});

        if(!admin)
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

                // Create a new admin with the hashed password
                let newAdmin = await Admin.create(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword, // Store the hashed password
                });
                
                if(newAdmin)
                {
                    req.flash('success', 'New Admin registered');
                    return res.redirect('/admin/sign-in');
                }
                else
                {
                    req.flash('error', 'Error In Admin registering');
                    return res.redirect('back');
                }
            }
        }
        else
        {
            // console.log('user is already registered');
            req.flash('error', 'This Admin is already registered');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log('Error in creating admin :', err);
        return res.send('Internal Server Error');
    }
}

export function createSession(req, res)
{
    req.flash('success', 'Signed In Successfully');
    return res.redirect('/admin/dashboard');
}

export function adminDashboard(req, res)
{
    try
    {
        if(req.user)
        {
            return res.render('admin_Dashboard',
            {
                title: "Admin Dashboard",
            });
        }
        else
        {
            return res.status(404).redirect('/admin/sign-in');
        }
        
    }
    catch(error)
    {
        console.log('Error in admindashboard controller :', error);
        return res.send('Internal Server Error');
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