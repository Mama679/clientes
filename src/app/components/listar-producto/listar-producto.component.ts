import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {
  listarProductos: Producto[]=[];

  constructor(private _productoService: ProductoService,
              private toastr: ToastrService){}
 
  ngOnInit(): void {
    this.obtenerProductos();    
  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data =>{
      console.log(data);
      this.listarProductos = data;
    },error =>{
      console.log(error);
    })
  }

  borrarProducto(id: any){
    this._productoService.eliminarProducto(id).subscribe(data =>{
      this.toastr.error('Producto ha sido eliminados','Producto');
      this.obtenerProductos();
    },error =>{
      console.log(error);
    });
  }
}
