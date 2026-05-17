import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse';
import { Proveedor } from '../model/Proveedor';
import { Producto } from '../model/Producto';
import { ProductoProveedor } from '../model/ProductoProveedor';
@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  //Crear variable de entorno,  por ahora es de prueba
  private apiUrl = 'http://localhost:8080/api/proveedor';
  constructor(private http: HttpClient) {}
  listarProveedores(): Observable<ApiResponse<Proveedor[]>> {
    return this.http.get<ApiResponse<Proveedor[]>>(this.apiUrl + '/listado');
  }
  agregarProducto(proveedorProducto: ProductoProveedor): Observable<any> {
    return this.http.post(this.apiUrl, proveedorProducto);
  }

}
