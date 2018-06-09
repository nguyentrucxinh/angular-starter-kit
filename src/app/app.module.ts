import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/pages';
import { Config } from './services/config';
import { Global } from './services/global';
import { HttpService } from './services/http.service';
import { GlobalErrorHandler } from './services/global-error-handle';
import { InitProvider } from './services/init.service';
import { UserService } from './services/user.service';

function loadInitData(provider: InitProvider) {
  return () => provider.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    // ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AdminModule
  ],
  providers: [
    Config,
    Global,
    HttpService,
    UserService,
    InitProvider,
    { provide: ErrorHandler, useClass: GlobalErrorHandler, },
    { provide: APP_INITIALIZER, useFactory: loadInitData, deps: [InitProvider], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
