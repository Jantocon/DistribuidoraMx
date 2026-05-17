import { Observable } from 'rxjs';
import { ApiResponse } from '../model/ApiResponse';
import { TipoProducto } from '../model/TipoProducto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TipoProductoService {
  //Crear variable de entorno,  por ahora es de prueba
  private apiUrl = 'http://localhost:8080/api/tipoproducto';
  constructor(private http: HttpClient) {}
  listarTipoProductos(): Observable<ApiResponse<TipoProducto[]>> {
    return this.http.get<ApiResponse<TipoProducto[]>>(this.apiUrl + '/listado');
  }
}
