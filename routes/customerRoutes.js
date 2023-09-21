import { Router } from 'express';
import passport from 'passport';
import loanRoutes from './loanRoutes.js';
import { signIn, signUp, createCustomer, createSession, customerDashboard,destroySession } from '../controllers/customerController.js';
import paymentRouter from './paymentRoutes.js';
const customerRouter = Router();

customerRouter.get('/sign-in', signIn);
customerRouter.get('/sign-up', signUp);
customerRouter.get('/dashboard',customerDashboard);

customerRouter.post('/create', createCustomer);
customerRouter.post
(   
    '/create-session', 
    passport.authenticate('customer-local', 
    {
        failureRedirect: '/customer/sign-in',
        failureFlash: true,
    })
    ,createSession
);

customerRouter.get('/destroy-session', destroySession);

customerRouter.use('/loans' ,loanRoutes);

customerRouter.use('/payments', paymentRouter);

export default customerRouter;