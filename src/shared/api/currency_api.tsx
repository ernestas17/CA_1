import axios from 'axios';
import { ICurrencyObject } from '../../components/ValiutuSkaiciuokle';

const httpClient = axios.create({
    baseURL: 'https://api.freecurrencyapi.com/v1',
    timeout: 1000,
});

httpClient.interceptors.response.use(
    (response) => response.data.data,
    (error) => Promise.reject(error)
);

class API {
    private availableCurrencies: string;
    private latestRates: string;
    private historicalRates: string;
    private key = 'ZWTt8OZpvjafO58niaavuwdoAj1nd3c0bXaXHVvy';

    constructor() {
        this.availableCurrencies = '/currencies';
        this.latestRates = '/latest';
        this.historicalRates = '/historical';
        // this.key = 'At3YQiiLJKWnBJXi9aYul9CCNrdZUaZ4ZDCfqAx5';
    }

    public async getAvailableCurrencies(): Promise<ICurrencyObject> {
        const data: ICurrencyObject = await httpClient.get(`${this.availableCurrencies}?apikey=${this.key}`);
        return data;
    }

    public async getLatestRates(currency: string): Promise<ICurrencyObject> {
        const data: ICurrencyObject = await httpClient.get(`${this.latestRates}?apikey=${this.key}&base_currency=${currency}`);
        return data;
    }
    public async getHistoricalRates(date: string, currency: string): Promise<ICurrencyObject> {
        const data: ICurrencyObject = await httpClient.get(
            `${this.historicalRates}?apikey=${this.key}&date_from=${date}&date_to=${date}&base_currency=${currency}`
        );
        return data;
    }
}

export default new API();
