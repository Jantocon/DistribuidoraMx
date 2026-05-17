import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse';
import { Producto } from '../model/Producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  //Crear variable de entorno,  por ahora es de prueba
  private apiUrl = 'http://localhost:8080/api/productos';
  constructor(private http: HttpClient) {}
  agregarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }
  listarProductos(): Observable<ApiResponse<Producto[]>> {
    return this.http.get<ApiResponse<Producto[]>>(this.apiUrl + '/listado');
  }
  editarProducto(id: number, producto: Producto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto);
  }
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  buscarProducto(clave: string, idTipoProducto: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?clave=${clave}&idTipoProducto=${idTipoProducto}`);
  }
}
