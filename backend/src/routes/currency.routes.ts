import { Router } from "express";
import { CurrencyController } from "../controllers/currency.controller";

const router = Router();

router.get('/currencies', CurrencyController.getCurrencies);
router.post('/convert', CurrencyController.convertCurrency);
router.get('/history', CurrencyController.getHistory);

export default router;