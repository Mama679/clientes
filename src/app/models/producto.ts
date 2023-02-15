export class Producto{
    _id?: number;
    nombre: string;
    categoria: string;
    ubicacion: string;
    precio: number;

    constructor(nom:string,cat:string,ubi:string,pre:number){
        this.nombre = nom;
        this.categoria = cat;
        this.ubicacion = ubi;
        this.precio = pre;
    }

}