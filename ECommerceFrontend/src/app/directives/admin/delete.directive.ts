import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService) {


    const icon = _renderer.createElement("mat-icon");
    icon.setAttribute("aria-hidden", "false");
    icon.setAttribute("role", "img");
    icon.setAttribute("fontIcon", "delete");
    icon.setAttribute("style", "cursor:pointer;");
    icon.setAttribute("class", "mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color");


    _renderer.appendChild(element.nativeElement, icon);

  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.BallAtom);
      const td: HTMLTableCellElement = this.element.nativeElement;
      //await this.productService.delete(this.id);
      this.httpClientService.delete({
        controller:this.controller
      },this.id).subscribe(data =>{
        $(td.parentElement).animate({
          opacity: 0,
          left:"+=50"
        },700,()=>{
          this.callback.emit();
          this.alertifyService.message("Product was removed",{
            dismissOtherts:true,
            messageType:MessageType.Success,
            position:Position.TopRight
          });
        });
      },(errorResponse:HttpErrorResponse)=>{
        this.spinner.hide();
        this.alertifyService.message("Ooooops!",{
          dismissOtherts:true,
          messageType:MessageType.Error,
          position:Position.TopRight
        })
      });      
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }

}
