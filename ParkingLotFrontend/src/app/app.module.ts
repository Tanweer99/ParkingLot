import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from 'modules/user/user.module';
import { AuthenticationModule } from 'modules/authentication/authentication.module';
import { AdminModule } from 'modules/admin/admin.module';
import { BookSlotService } from 'src/service/book-slot.service';
import { AuthInterceptor } from 'src/auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    UserModule,
    AuthenticationModule,
    AdminModule
  ],
  providers: [BookSlotService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
