import { Component, OnInit } from '@angular/core';
import { CurrencyApiService } from '../../services/currency-api.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css'
})
export class CurrencyConverterComponent implements OnInit{

  public currencies: string[] = [];
  public baseCurrency: string = '';
  public targetCurrency: string = '';
  public amount: number = 0;
  public conversionResult: number | null = null;
  public loading: boolean = false;

  constructor(private currencyAPI: CurrencyApiService) { }

  ngOnInit(): void {
    this.currencyAPI.getCurrencies().subscribe((data: any) => {
      this.currencies = Object.keys(data.currencies);
    });
  }

  convertCurrency(): void { 
    this.loading = true;
    this.currencyAPI.convertCurrency(this.baseCurrency, this.targetCurrency, this.amount).subscribe((data: any) => {
      this.conversionResult = data.conversion.result;
      // console.log(data);
      this.loading = false;
    });
  }

}
