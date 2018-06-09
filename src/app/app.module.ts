import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/pages';
import { Config, Global, HttpService, GlobalErrorHandler, InitProvider } from './services/services';

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
    AppRoutingModule,
    AdminModule
  ],
  providers: [
    Config,
    Global,
    HttpService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler, },
    { provide: APP_INITIALIZER, useFactory: loadInitData, deps: [InitProvider], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
