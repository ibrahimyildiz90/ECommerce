import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,private httpClentService:HttpClientService){
    super(spinner);
  }
  
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);

    this.httpClentService.get<Product[]>({
      controller: "products"
    }).subscribe(data=>console.log(data));


    // this.httpClentService.post({
    //   controller:"products"
    // },{
    //   name:"Pencil",
    //   stock:100,
    //   price:15
    // }).subscribe();

    
    // this.httpClentService.put({
    //   controller:"products"
    // },{
    //   id:"832dcdaf-ab5f-425a-82cc-385ae60f30f4",
    //   name:"Red Paper",
    //   stock:1250,
    //   price:4
    // }).subscribe();

    // this.httpClentService.delete({
    //   controller: "products"
    // },"6e9a9211-09de-4e9c-8558-91968f70753a").subscribe();

  }

}
