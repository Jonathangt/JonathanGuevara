import { Component, inject } from '@angular/core';
import { ProductInterface } from '../../interface/product.interface';
import { ProductStore } from '../../store/product.store';
import { Router } from '@angular/router';
import { RouteNames } from '../../../route-names';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ProductService } from '../../services/product.service';
import { NgOptimizedImage } from '@angular/common';
import { RequestState } from '../../states/index.states';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    DeleteModalComponent,
    NgOptimizedImage
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})


export class ListComponent {

  products: ProductInterface[] = [];
  productStore = inject(ProductStore);
  showDeleteModal = false;
  selectedProduct: ProductInterface | null = null;
  selectedProductId: string | null = null;
  stateRequest: RequestState = 'NONE';

  constructor(private readonly router: Router, private readonly productService: ProductService) {
  }

  ngOnInit(): void {
    // const product = {
    //   id: `${(Math.floor(Math.random() * 1000) + 1).toString()}`,
    //   name: Math.random().toString(36).substring(2, 8),
    //   description: 'description',
    //   logo: 'https://yt3.googleusercontent.com/y4J_Fs5ksRlxx6_LzT1VKxVqH_T8Vyn_RN_YYgLJhuMzBS5qxTgm7NlEcMkQd3hgCpfWtYcEUg=s900-c-k-c0x00ffffff-no-rj',
    //   date_release: new Date(),
    //   date_revision: new Date()
    // };

    // if (this.stateRequest === 'LOADING') return;
    // this.stateRequest = 'LOADING';
    // this.productService.create(product).subscribe({
    //   next: (data) => {
    //     this.stateRequest = 'LOAD_ENDED';
    //   },
    //   error: (err: any) => {
    //     this.stateRequest = 'ERROR';
    //   }
    // });

    this.productService.get().subscribe((response) => {
      this.products = response?.data ?? [];
      this.productStore.addProduct(this.products);
    });
  }

  toggleMenu(productId: string): void {
    this.selectedProductId = this.selectedProductId === productId ? null : productId;
  }

  isMenuOpen(productId: string): boolean {
    return this.selectedProductId === productId;
  }

  async editProduct(product: ProductInterface) {
    this.closeModal();
    await this.router.navigate([RouteNames.editProduct, product.id]);
  }

  deleteProduct(product: ProductInterface) {
    this.selectedProduct = product;
    this.showDeleteModal = true;
  }

  changeItemsPerPage(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.productStore.setItemsPerPage(+selectedValue);
  }

  confirmDelete() {
    if (!this.selectedProduct?.id) return;

    this.productService.delete(this.selectedProduct.id).subscribe({
      next: (data) => {
        if (!this.selectedProduct?.id) return;
        this.productStore.removeItem(this.selectedProduct.id);
        this.closeModal();
      },
      error: (err: any) => {
        console.error(err);
        this.closeModal();
      }
    });

    if (this.selectedProduct) this.productStore.removeItem(this.selectedProduct.id);
    this.closeModal();
  }

  closeModal() {
    this.showDeleteModal = false;
    this.selectedProduct = null;
  }


}
