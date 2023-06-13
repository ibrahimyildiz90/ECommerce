import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() createdProduct : EventEmitter<CreateProduct> = new EventEmitter();

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

      this.createdProduct.emit(createproduct);
    },erorMessage=>{
      this.alertify.message(erorMessage,
        {
          dismissOtherts:true,
          messageType:MessageType.Error,
          position:Position.TopRight,
          delay:5
        })
    });
  }

}
