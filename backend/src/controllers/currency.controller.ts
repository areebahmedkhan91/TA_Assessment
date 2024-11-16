import { Request, Response } from "express";
import { CurrencyService } from "../services/currency.service";
import { ConversionHistory } from "../models/history.model";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

const historyFilePath = "./src/data/history.json";

export class CurrencyController {
    static async getCurrencies(req: Request, res: Response) {
        try {
            const currencies = await CurrencyService.getCurrencies();
            res.status(200).json({currencies});
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async convertCurrency(req: Request, res: Response) {
        const { base, target, amount } = req.body;
        try {
            const result = await CurrencyService.convertCurrency(base, target, parseFloat(amount));
            const history: ConversionHistory = {
                id: uuidv4(),
                baseCurrency: base,
                targetCurrency: target,
                amount,
                result,
                date: new Date().toISOString(),
            };

            const historyData = JSON.parse(fs.readFileSync(historyFilePath, "utf-8"));
            historyData.push(history);
            fs.writeFileSync(historyFilePath, JSON.stringify(historyData, null, 2));
            res.status(200).json({ conversion: history });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async getHistory(req: Request, res: Response) {
        try {
            const historyData = JSON.parse(fs.readFileSync(historyFilePath, "utf-8"));
            res.status(200).json(historyData);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch history: " + error });
        }
    }
}