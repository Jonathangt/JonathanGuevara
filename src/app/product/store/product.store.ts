import { ProductInterface } from '../interface/product.interface';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { computed } from '@angular/core';

export interface ProductState {
  products: ProductInterface[];
  filterTerm: string | undefined;
  itemsPerPage: number;
}

const initialState: ProductState = {
  products: [],
  filterTerm: undefined,
  itemsPerPage: 5
};

export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(({ products, filterTerm, itemsPerPage, ...store }) => ({

    addProduct(product: ProductInterface[]) {
      const updateProduct = [...products(), ...product];
      patchState(store, { products: updateProduct });
    },

    removeItem(id: string) {
      const updateProduct = products().filter(product => product.id != id);
      patchState(store, { products: updateProduct });
    },

    setFilterTerm(term: string | undefined) {
      patchState(store, { filterTerm: term });
    },

    filteredProducts: computed(() => {
      const term = filterTerm()?.toLowerCase();
      let filtered = products();
      if (term) filtered = filtered.filter(product => product.name.toLowerCase().includes(term));
      return itemsPerPage() > 0 ? filtered.slice(0, itemsPerPage()) : filtered;
    }),

    setItemsPerPage(count: number) {
      patchState(store, { itemsPerPage: count });
    }
  }))
);
