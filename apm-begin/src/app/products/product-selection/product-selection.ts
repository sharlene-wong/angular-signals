import { Component, computed, effect, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductData } from '../product-data';
import { Product } from '../product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-selection',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css'
})
export class ProductSelection {
  pageTitle = 'Product Selection';

  selectedProduct = signal<Product | undefined>(undefined);

  quantity = linkedSignal({  // reset the value of a writeable signal as defined by the computation function.
    source: this.selectedProduct,
    computation: p => 1 // p parameter is the value of the source signal, we want the quantity to be reset to 1 whenever a new product is selected, so we ignore the p parameter and return 1 as the new value of the quantity signal.
  });

  products = signal(ProductData.products);

  total = computed(() => (this.selectedProduct()?.price ?? 0) * this.quantity());
  colour = computed(() => this.total() >= 200 ? 'green' : 'blue');

  onIncrease() {
    this.quantity.update(q => q + 1); // update receives the current value.  Use the arrow function to determine the new value, q = parameter, q + 1 = new value.  This is the recommended way to update a signal when the new value depends on the current value.
  }

  onDecrease() {
    this.quantity.update(q => q <= 0 ? 0 : q - 1); // update receives the current value.  Use the arrow function to determine the new value, q = parameter, q - 1 = new value.  This is the recommended way to update a signal when the new value depends on the current value.
  }

  qtyEffect = effect(() => console.log('Quantity: ' + this.quantity()));
}
