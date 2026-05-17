import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  ProductoService } from '../../services/producto.service';
import { Producto } from '../../model/Producto';
import { ChangeDetectorRef } from '@angular/core';
import { TipoProductoService } from '../../services/tipoProducto.service';
import { TipoProducto } from '../../model/TipoProducto';
import { ModalComponent } from '../../shared/modal/modal';
import { ProductoProveedor } from '../../model/ProductoProveedor';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../model/Proveedor';

@Component({
  selector: 'app-productos',
  imports: [FormsModule, ModalComponent],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit {
  claveBusqueda: string = '';
  productos: Producto[] = [];
  proveedores: Proveedor[] = [];
  tipoProductoSeleccionado: number = 0;
  tipoProductos: TipoProducto[] = [];
  productoEditando: Producto | null = null;
  productoAgregando: Producto | null = null;
  productoProveedorAgregando: ProductoProveedor | null = null;
  modoEdicion = false;
  mostrarModal = false;
  protected modoAgregar: any;
  constructor(
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService,
    private proveedorService: ProveedorService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.cargarProductos();
    this.cargarTipoProductos();
  }
  cargarProductos() {
    this.productoService.listarProductos().subscribe({
      next: (respuesta) => {
        this.productos = [...respuesta.data];
      },
      error: (err) => {
        console.error('Error al listar productos', err);
      },
    });
  }

  cargarProveedores() {
    this.proveedorService.listarProveedores().subscribe({
      next: (respuesta) => {
        this.proveedores = [...respuesta.data];
      },
      error: (err) => {
        console.error('Error al listar productos', err);
      },
    });
  }

  cargarTipoProductos() {
    this.tipoProductoService.listarTipoProductos().subscribe({
      next: (respuesta) => {
        this.tipoProductos = [...respuesta.data];
        if (this.tipoProductos.length > 0) {
          this.tipoProductoSeleccionado = this.tipoProductos[0].id;
        }
      },
      error: (err) => {
        console.error('Error al listar tipo productos', err);
      },
    });
  }

  agregar() {
    if (!this.productoAgregando) return;
    const nuevoProducto = { ...this.productoAgregando };
    this.productoService.agregarProducto(nuevoProducto).subscribe({
      next: () => {
        this.cargarProductos();
        alert('Producto agregado correctamente');

      },
      error: (err) => {
        console.error('Error al agregar', err);
      },
    });
  }
  buscar() {
    this.productoService
      .buscarProducto(this.claveBusqueda, this.tipoProductoSeleccionado)
      .subscribe({
        next: (respuesta) => {
          this.productos = [respuesta];
          alert('Producto encontrado');

        },
        error: (err) => {
          console.error('Error al actualizar', err);
        },
      });
  }
  toggleAgregar() {
    this.cargarProveedores();
    this.modoAgregar = !this.modoAgregar;
    if (this.modoAgregar) {
      this.productoAgregando = {
        id: 0,
        clave: '',
        nombre: '',
        precio: 0,
        tipoProductoId: this.tipoProductoSeleccionado ?? 0,
      };
    }
    this.productoProveedorAgregando = {
      id: 0,
      claveInterna: '',
      costo: 0,
      id_producto: 0,
      id_proveedor: 0,
    };
  }
  editar(producto: Producto) {
    this.productoEditando = { ...producto };
    this.modoEdicion = true;
  }
  cancelar() {
    this.modoEdicion = false;
    this.productoEditando = null;
  }
  guardarEdicion() {
    if (!this.productoEditando) return;
    this.productoService.editarProducto(this.productoEditando.id, this.productoEditando).subscribe({
      next: () => {
        this.cargarProductos();
        this.cancelar();
        alert('Producto editado correctamente');

      },
      error: (err) => {
        console.error('Error al actualizar', err);
      },
    });
  }

  eliminar(id: number) {
    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        this.cargarProductos();
        this.productos = this.productos.filter((p) => p.id !== id);
        alert('Producto eliminado correctamente');

      },
      error: (err) => {
        console.error('Error al eliminar', err);
      },
    });
  }
  guardarProductoProveedor() {
    if (!this.productoProveedorAgregando) return;
    const nuevoProductoProveedor = { ...this.productoProveedorAgregando };
    this.proveedorService.agregarProducto(nuevoProductoProveedor).subscribe({
      next: () => {
        this.mostrarModal=false;
        alert("Producto Proveedor agregado correctamente")
      },
      error: (err) => {
        console.error('Error al agregar', err);
      },
    });
  }
}
