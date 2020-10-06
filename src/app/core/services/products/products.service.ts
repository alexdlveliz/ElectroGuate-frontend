import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProducts() {
    // Llamada a la API para obtener TODOS los productos
    return [
      { "id": 1, "name": "Secadora" },
      { "id": 2, "name": "Tostadora" },
      { "id": 3, "name": "Consola" }
    ]
  }
}
