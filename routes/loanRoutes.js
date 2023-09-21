import { Router } from 'express';
import { applyForLoan, loanDashboard, getAllLoansDetails, approveLoan, rejectLoanApplication} from '../controllers/loanController.js';

const loanRouter = Router();

// customer access routes
loanRouter.get('/dashboard/:id', loanDashboard);
loanRouter.post('/loanApplication/:id', applyForLoan);

// admin access routes
loanRouter.get('/all-loans/:id', getAllLoansDetails);
loanRouter.get('/approve-loan/:id', approveLoan);
loanRouter.get('/reject-loan/:id', rejectLoanApplication);

export default loanRouter;