import { Component, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/listproduct';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit{
  constructor(spinner:NgxSpinnerService,private productService:ProductService,private alertifyService:AlertifyService){
    super(spinner);
  }

 
  displayedColumns: string[] = ['name', 'stock', 'price','createdDate', 'updatedDate','edit','delete'];
  dataSource:MatTableDataSource<ListProduct> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts()
  {    
    this.showSpinner(SpinnerType.BallAtom);
    const page=this.paginator ? this.paginator.pageIndex : 0;
    const size=this.paginator ? this.paginator.pageSize : 5;
    const allproducts:{totalCount :number; products:ListProduct[]} =await  this.productService.read(page,size,()=>this.hideSpinner(SpinnerType.BallAtom),
      erorMessage=>this.alertifyService.message(erorMessage,{
        dismissOtherts:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      }));

      this.dataSource = new MatTableDataSource<ListProduct>(allproducts.products);
      this.paginator.length = allproducts.totalCount;
      // this.dataSource.paginator = this.paginator;
  }

/*   delete(id,event)
  {   
    const icon=event.srcElement;
    $(icon.parentElement.parentElement).fadeOut(2000);
  }
 */
  async pageChanged()
  {
    await this.getProducts();
  }

  async ngOnInit(): Promise<void> {
    await this.getProducts();
  }
  
}


// x.Id,
// x.Name,
// x.Stock,
// x.Price,
// x.CreatedDate,
// x.UpdatedDate
