import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $:any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService,
    private spinner:NgxSpinnerService) {
    
   
      const icon = _renderer.createElement("mat-icon");
      icon.setAttribute("aria-hidden","false");
      icon.setAttribute("role","img");
      icon.setAttribute("fontIcon","delete");
      icon.setAttribute("style","cursor:pointer;");
      icon.setAttribute("class","mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color");
     

      _renderer.appendChild(element.nativeElement,icon);

  }

  @Input() id : string;
  @Output() callback:EventEmitter<any>=new EventEmitter();

  @HostListener("click")
  async onclick(){
    this.spinner.show(SpinnerType.BallAtom);
    const td:HTMLTableCellElement=this.element.nativeElement;
    await this.productService.delete(this.id);
    $(td.parentElement).fadeOut(2000,()=>{
      this.callback.emit();
    });
  }

}
