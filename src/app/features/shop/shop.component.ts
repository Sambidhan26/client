import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/Models/product';
import { MatCard} from '@angular/material/card';
import { ProductItemComponent } from "./product-item/product-item.component";
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ShopParams } from '../../shared/Models/shopParams';


@Component({
  selector: 'app-shop',
  imports: [
    MatCard,
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
    MatSelectTrigger
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  //public shopParams = inject(ShopParams);
  private dialogService = inject(MatDialog);
  title = 'Skinet';
  products: Product[] = [];
  selectedBrands: string[] = [];
  selectedTypes: string[] = [];
  selectedSort?: string[] = [];
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
   ];

    ngOnInit(): void {
    this.initializeShop();
}

initializeShop() {
  this.shopService.getBrands();
  this.shopService.getTypes();
  this.getProducts();
}

getProducts() 
{
   this.shopService.getProducts(this.selectedBrands, this.selectedTypes, this.selectedSort?.toString()).subscribe({
      next: response => this.products = response.data,
      error: error => console.log(error)
})
}

onSortChange(event: MatSelectionListChange)
{
  const selectOptions = event.options[0]
  if(selectOptions) {
    this.selectedSort = selectOptions.value;
    console.log('Selected sort: ' + this.selectedSort);
    this.getProducts();
  }
}
openFilterDialog() {
  const dialogRef = this.dialogService.open(FiltersDialogComponent, {
    minWidth: '500px',
    data: {selectedBrands: this.selectedBrands,
           selectedTypes: this.selectedTypes}
  });
  
  dialogRef.afterClosed().subscribe({
  next: result => {
    if (result) {
      //console.log(result);
      this.selectedBrands = result.selectedBrands;
      this.selectedTypes = result.selectedTypes;
      this.getProducts();
      
    }
  }
  });
}
}
