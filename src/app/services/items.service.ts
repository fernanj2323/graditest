import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  readonly url: string = 'https://' +'gradistore-spi.herokuapp.com' + '/products';

  product: Product | undefined
  products: Product[] | undefined

  constructor(
    private http: HttpClient
  ) { }

  
  
  public getAllProducts():Observable<Product[]> {
    
    return this.http.get(this.url+'/all')
    .pipe(map(data => {
        const response = data as any 
        return response.products.nodes
      
    }))

  }
  
}
