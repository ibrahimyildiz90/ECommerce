import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent   
  ],
  imports: [
    BrowserModule,   
    BrowserAnimationsModule, 
    AppRoutingModule,
    AdminModule,
    UiModule,    
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    HttpClientModule    
  ],
  providers: [
    {provide:"baseUrl",useValue:"https://localhost:7127/api",multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
