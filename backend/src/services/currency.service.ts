import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_URL = 'https://api.freecurrencyapi.com/v1';

export class CurrencyService {
    static async getCurrencies() {
        try {
            const response = await axios.get(`${API_URL}/currencies`, {
                headers: { apikey: process.env.API_KEY },
            });
            return response.data.data;
        } catch (error) {
            throw new Error('Failed to fetch currencies');
        }
    }

    static async convertCurrency(base: string, target: string, amount: number) {
        try {
            const response = await axios.get(
                `${API_URL}/latest?currencies=${target}&base_currency=${base}`,
                { headers: { apikey: process.env.API_KEY } }
            );
            const rate = response.data.data[target];
            return rate * amount;
        } catch (error) {
            throw new Error('Conversion failed');
        }
    }
}