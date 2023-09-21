import { Router } from 'express';
import passport from 'passport';
import loanRouter from './loanRoutes.js';
import 
{ 
    signIn, 
    signUp, 
    createAdmin, 
    createSession, 
    adminDashboard, 
    destroySession,
 } from '../controllers/adminControllers.js';
const adminRouter = Router();

adminRouter.get('/sign-in', signIn);
adminRouter.get('/sign-up', signUp);
adminRouter.get('/dashboard', adminDashboard);

adminRouter.post('/create', createAdmin);
adminRouter.post
(   
    '/create-session', 
    passport.authenticate('admin-local', 
    {
        failureRedirect: '/admin/sign-in',
        failureFlash: true,
    })
    ,createSession
);

adminRouter.get('/destroy-session', destroySession);

// all admin realated loan routes
adminRouter.use('/loans', loanRouter);

export default adminRouter;