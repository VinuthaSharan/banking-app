import { Router, Request, Response } from 'express';
import { accountController } from '../controllers/accountController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/details', (req: Request, res: Response) => accountController.getAccount(req, res));
router.post('/deposit', (req: Request, res: Response) => accountController.deposit(req, res));
router.post('/withdraw', (req: Request, res: Response) => accountController.withdraw(req, res));
router.get('/transactions', (req: Request, res: Response) => accountController.getTransactions(req, res));
router.get('/block-status', (req: Request, res: Response) => accountController.getBlockStatus(req, res));
router.get('/daily-transactions', (req: Request, res: Response) => accountController.getDailyTransactionStatus(req, res));

export default router;
