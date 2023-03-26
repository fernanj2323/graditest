import { Component, OnInit , AfterViewInit } from '@angular/core';
import { ItemsService  } from 'src/app/services/items.service'
import { Product } from 'src/app/models/product';

declare var $: any;
declare var M: any;
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent  implements OnInit  {

  product: Product | undefined
  public products: Product[] = []
  loader : boolean = true 
  currentPosition = 0 
  nextEnable = true  
  backEnable = false 






  constructor( 
    private ItemsService:ItemsService, 
  ){

  }

  ngOnInit() {
    this.getItems()


    let options : any 
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, Option);
    });

  }





  getItems(){
    
    this.loader = true 
    this.ItemsService.getAllProducts().subscribe
    (res  =>{
      this.products = res as Product[]



      this.products.map( (i , index ) => {
        i.position = index 
        i.marginLeft = 0 

        //a los pares les asignamos un size y a los impares otro 
        if (index % 2 === 0){
          i.size = "long-size" 
        }else{ 
          i.size = "short-size"
        }
        
        // obtenemos los numeros de tags
        let numbers: number[] = []
        i.tags.forEach(tag => {
          var entero = parseInt(tag)
          if (!Number.isNaN(entero)){
            numbers.push(entero)
          }
       
        })

        if (numbers.length){
   

            //calculamos el promedio 
            let numerador = 0 
    
            numbers.forEach( num => {
              numerador = num + numerador 
            
            })
            let average = numerador / numbers.length
            i.average = average 
  
            //asignamos las estrellas 
            if (average >= 0 && average <= 100){
              i.starts = 1 
            }else if (average >= 101 && average <= 200){
              i.starts = 2 
            }else if (average >= 201 && average <= 300){
              i.starts = 3
            }else if (average >= 301 && average <= 400 ){
              i.starts = 4
            }else if (average >= 401 && average <= 500){
              i.starts = 5    
            }

        }
      })


      this.loader = false 

    })

  }


  setNext( ){

    // movemos segun el tamano de pantalla 
    let width = screen.width;
    let jump = 24
    let limitPosition = 7 
    if (width <= 400 ){
      jump =  91
      limitPosition = 10
    }
    let finalPercentage = 0; 
    let nextPosition = this.currentPosition + 1; 


    if (nextPosition <= this.products.length - 1 ){
      finalPercentage = -jump * nextPosition
    }else{ 
      nextPosition = 0 
    }


    let product = this.products.find( i => i.position === 0) as any 
    product.marginLeft = finalPercentage


    this.currentPosition = nextPosition 


    // desactivamos el boton de next en caso de ser necesario 
    if (this.currentPosition == limitPosition){
      this.nextEnable = false 
    }else{ 
      this.nextEnable = true 
      this.backEnable = true 
    }
  }

  setBack(){

    // movemos segun el tamano de pantalla 
    let width = screen.width;
    let jump = 24
    let limitPosition = 0
    if (width <= 400 ){
      jump =  91
   
    }


    let finalPercentage = 0; 
    let backPosition = this.currentPosition - 1; 

    if (backPosition >= 0){
      finalPercentage = -jump * backPosition
    }else{ 
      backPosition =  this.products.length - 1 
    }


    let product = this.products.find( i => i.position === 0) as any 
    product.marginLeft = finalPercentage

   
    this.currentPosition = backPosition 
 
    // desactivamos el boton de back en caso de ser necesario 
    if (this.currentPosition == limitPosition){
      this.backEnable = false 
    }else{ 
      this.nextEnable = true 
      this.backEnable = true 
    }

  }
}
