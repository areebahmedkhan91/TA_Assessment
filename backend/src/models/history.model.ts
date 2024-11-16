export interface ConversionHistory {
    id: string,
    baseCurrency: string;
    targetCurrency: string;
    amount: number;
    result: number;
    date: string;
}