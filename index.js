import express from 'express';
import routes from './routes/index.js'
import expressLayout from 'express-ejs-layouts';
import session from 'express-session';
import db from './config/mongoose.js';
import passport from 'passport';
import passportLocal from './config/passport-local-strategy.js';
// import passportJWT from './config/passport-jwt-strategy.js';
import flash from 'connect-flash';
import { setFlash } from './config/middleware.js';

const PORT = 8000;
const app = express();

app.use(express.json());
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./assets'));
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

// use session middileware
app.use(session
({
    secret: 'ZNMDVNqWsy', // Replace with a strong, random string
    resave: false, // Do not save the session if it's not modified
    saveUninitialized: false, // Do not save uninitialized sessions
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set authenticated user in locals for views
app.use(passportLocal.setAuthenticatedUser);

// Initialize connect-flash
app.use(flash());
app.use(setFlash);

// Redirected to folder routes
app.use('/', routes);

app.listen(PORT, (err)=>
{
    if(err)
    {
        console.log('Error in running server ', err);
        return;
    }
    console.log(`express server is running on ${PORT} port !`);
});