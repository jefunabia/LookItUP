import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';

import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { RegisterService } from './services/register.service';

import { LoginComponent } from '@components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { AboutComponent } from '@components/about/about.component';
import { ContactComponent } from '@components/contact/contact.component';
import { HomeComponent } from '@components/home/home.component';
import { MainComponent } from '@components/main/main.component';

import { PasswordSecurityService } from './services/password-security.service';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { UserService } from './services/user.service';
import { TokenService } from './services/token.service';

import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { TsaComponent } from './components/tsa/tsa.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    RegisterComponent,
    LoginComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    MainComponent,
    TsaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    HttpClientModule,
    GooglePlaceModule
  ],
  providers: [RegisterService, PasswordSecurityService, AuthGuardService, UserService, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
