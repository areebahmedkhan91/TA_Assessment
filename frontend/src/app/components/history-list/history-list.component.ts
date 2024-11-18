import { Component, OnInit } from '@angular/core';
import { CurrencyApiService } from '../../services/currency-api.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrl: './history-list.component.css'
})
export class HistoryListComponent implements OnInit {

  public history: any[] = [];

  constructor(private apiService: CurrencyApiService) { }
  ngOnInit(): void {
    this.apiService.getHistory().subscribe((data) => {
      this.history = data;
    })
  }

}
