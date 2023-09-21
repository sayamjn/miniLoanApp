import { Router } from 'express';
import adminRoutes from './adminRoutes.js';
import customerRoutes from './customerRoutes.js';
import { home } from '../controllers/homeController.js';

const router = Router();

router.get('/', home);

router.use('/admin', adminRoutes);
router.use('/customer', customerRoutes);

export default router;