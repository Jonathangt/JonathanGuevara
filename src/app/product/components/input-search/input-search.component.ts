import { Component, inject } from '@angular/core';
import { ProductStore } from '../../store/product.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss'
})
export class InputSearchComponent {

  productStore = inject(ProductStore);
  filterProduct: string | undefined = '';

  searchProduct = (): void => {
    this.productStore.setFilterTerm(this.filterProduct);
  };
}
