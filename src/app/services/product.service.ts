import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })      // uma única instância para o app todo
export class ProductService {
  private products: Product[] = Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    name: 'Produto ' + String(i + 1).padStart(2, '0'),
    price: 19.9 + (i + 1) * 7.5,
    createdAt: new Date(2025, 0, i + 1)
  }));

  getAll(): Product[] {
    return this.products;
  }
}