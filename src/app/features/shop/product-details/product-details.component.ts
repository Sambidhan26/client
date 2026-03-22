import { Component, inject } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { Product } from '../../../shared/Models/product';
import { CurrencyPipe } from '@angular/common';
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatLabel } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe,
    MatButton,
    MatAnchor,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel, 
    MatDivider,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
private shopService = inject(ShopService);
private activatedRoute = inject(ActivatedRoute);
product?: Product;

ngOnInit(): void {
  this.loadProduct();
}

loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id) return;
    if (id) {
        this.shopService.getProduct(+id).subscribe({
            next: product => this.product = product,
            error: error => console.log(error)
        });
    }
}
}
