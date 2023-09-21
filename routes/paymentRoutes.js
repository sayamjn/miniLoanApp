import { Router } from "express";
import { loanPayment} from "../controllers/paymentController.js";

const paymentRouter = Router();

paymentRouter.post('/loan-payment/:paymentId', loanPayment);


export default paymentRouter;