import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/createproduct';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(spiner:NgxSpinnerService, private productService: ProductService,private alertify:AlertifyService) {
    super(spiner);
  }

  ngOnInit(): void {


  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const createproduct: CreateProduct = new CreateProduct();
    createproduct.name = name.value;
    createproduct.stock = parseInt(stock.value);
    createproduct.price = parseFloat(price.value);

    this.productService.create(createproduct,()=>{
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Product Created",{
        dismissOtherts:true,
        messageType:MessageType.Success,
        position:Position.TopRight
      });
    });
  }

}
