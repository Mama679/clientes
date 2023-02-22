import { Component,OnInit} from '@angular/core';
import{FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit{
  productoForm : FormGroup;
  titulo = "Crear Producto";
  id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private _productoService: ProductoService,
              private toast: ToastrService,
              private aRouter: ActivatedRoute ){
       this.productoForm = this.fb.group({
       producto:['',Validators.required],
       categoria:['',Validators.required],
       ubicacion:['',Validators.required],
       precio:['',Validators.required]
    });

    this.id = this.aRouter.snapshot.paramMap.get('id');
    
  }
  ngOnInit(): void {
    this.esEditar();
  }

  addProducto(){
    //console.log(this.productoForm.value);
    const producto: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value
    };

    if(this.id !== null)
    {
      //Editar producto
      this._productoService.editarProducto(this.id,producto).subscribe(data =>{
        this.toast.info('Producto ha sido Actualizado','Producto');
        this.router.navigate(['/']);
      });
    }
    else{
      //Agregar producto
      this._productoService.guardarProducto(producto).subscribe(data =>{
        this.toast.success('El producto fue agregado con exito.','Producto');
        this.router.navigate(['/']);
      },error =>{
        console.log(error);
        this.productoForm.reset();
      });
    }      
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = "Editar Producto";
      this._productoService.obtenerProducot(this.id).subscribe(data =>{
          this.productoForm.setValue({
            producto: data.nombre,
            categoria: data.categoria,
            ubicacion: data.ubicacion,
            precio: data.precio
          });
      },error =>{
        console.log(error);
      });
    }
  }
}
