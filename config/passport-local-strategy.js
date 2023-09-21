import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import bcrypt from 'bcrypt';
import Admin from '../models/admin.js'; // Import your Admin model
import Customer from '../models/customer.js'; // Import your Customer model

// Configure Passport for admin authentication
passport.use("admin-local", new LocalStrategy(
    { 
        usernameField: "email",
    },
    async function(email, password, done)
    {
        try 
        {
        // Find the admin by email
            const admin = await Admin.findOne({email: email });

            if (!admin) 
            {
                return done(null, false, {message: "Admin Not Found"});
            }

            // Compare the provided password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, admin.password);

            if (isPasswordValid) 
            {
                return done(null, admin);
            } 
            else 
            {
                return done(null, false, {message :"Invalid Password"});
            }
        } 
        catch (error) 
        {
            console.error('Error during admin authentication:', error);
            return done(error); // Handle unexpected errors
        }
    })
);

passport.use("customer-local", new LocalStrategy(
    { 
        usernameField: "email",
    },
    async (email, password, done) => 
    {
        try 
        {
            // Find the customer by email
            const customer = await Customer.findOne({email: email });

            if (!customer) 
            {
                return done(null, false,{message: "Customer Not Found"});
            }

            // Compare the provided password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password,customer.password);

            if (isPasswordValid) 
            {
                return done(null, customer);
            } 
            else 
            {
                return done(null, false, {message: "Invalid password"});
            }
        } 
        catch (error) 
        {
            console.error('Error during customer authentication:', error);
            return done(error); // Handle unexpected errors
        }
    })
);

// Serialize and deserialize users
passport.serializeUser((user, done) => 
{
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => 
{
    try 
    {
        const admin = await Admin.findById(id);
        if (admin) 
        {
            done(null, admin);
        } 
        else 
        {
            await Customer.findById(id)
            .then((customer)=>
            {
                return done(null, customer);
            })
            .catch((err)=>
            {
                console.log(`Error in finding the user in deserialize function ${err}`);
                return done(err);
            });
        }
    } 
    catch (error) 
    {
        done(error);
    }
});


passport.setAuthenticatedUser = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        // req.user contains the current signed in user from the session cookies and we are just sending this to locals for views 
        res.locals.user = req.user;
    }
    next();
}


export default passport;