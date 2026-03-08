import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/Models/product';
import { Pagination } from './shared/Models/pagination';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  baseUrl = 'http://localhost:5000/api/';
  private http = inject(HttpClient);
  title = 'Skinet';
  products: Product[] = [];

    ngOnInit(): void {
    this.http.get<Pagination<Product>>(this.baseUrl + 'products').subscribe({
      next: response => this.products = response.data,
      error: error => console.log(error), 
      complete: () => console.log('Request completed')
  })
}
}
