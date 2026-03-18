import { Component, Input} from '@angular/core';
import { Product } from '../../../shared/Models/product';
import { MatCard, MatCardContent, MatCardActions } from "@angular/material/card";
import { CurrencyPipe } from '@angular/common';
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-product-item',
  imports: [MatCard, MatCardContent, CurrencyPipe, MatCardActions, MatAnchor, MatIcon,MatButton],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  @Input() product?: Product
}
