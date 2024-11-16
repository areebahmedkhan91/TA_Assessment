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
            res.status(200).json({ currencies });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async convertCurrency(req: Request, res: Response) {
        const { base, target, amount } = req.body;
        console.log("Request received:", { base, target, amount });

        try {
            const parsedAmount = parseFloat(amount);
            console.log("Parsed amount:", parsedAmount);

            const result = await CurrencyService.convertCurrency(base, target, parsedAmount);
            console.log("Conversion result:", result);

            const history: ConversionHistory = {
                id: uuidv4(),
                baseCurrency: base,
                targetCurrency: target,
                amount: parsedAmount,
                result,
                date: new Date().toISOString(),
            };
            console.log("History object:", history);

            let historyData = [];
            try {
                const fileContent = fs.readFileSync(historyFilePath, "utf-8");
                if (fileContent) {
                    historyData = JSON.parse(fileContent);
                }
            } catch (err) {
                console.error("Error reading or parsing history file:", err);
            }

            historyData.push(history);
            fs.writeFileSync(historyFilePath, JSON.stringify(historyData, null, 2));
            console.log("Updated history data written to file");

            res.status(200).json({ conversion: history });
        } catch (error) {
            console.error("Error in convertCurrency:", error);
            res.status(500).json({ message: error || "Internal Server Error" });
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