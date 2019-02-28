import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import * as fromHomeStore from 'app/home/store';
import * as fromLoginStore from 'app/login/store';
import * as fromProfileStore from 'app/profile/store';

import {
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatChipsModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatTooltipModule,
  MatTabsModule
} from '@angular/material';

import {
  ToastrModule,
  ToastNoAnimationModule,
} from 'ngx-toastr';

import { CustomSerializer, metaReducers, rootReducer } from './store.config';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';

import { AppComponent } from 'app/app.component';
import { HeaderComponent } from '@main';
import { HomeComponent } from 'app/home/home.component';
import { IndicateComponent } from 'app/indicate/indicate.component';

import { HomeService } from '@services/home.service';
import { LoginService } from '@services/login.service';
import { ProfileService } from '@services/profile.service';
import { TokenService } from '@services/token.service';

import { LoadingComponent, EmptyComponent} from '@shared/components';
import { LoginComponent } from 'app/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    IndicateComponent,
    LoadingComponent,
    EmptyComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,

    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,

    ToastNoAnimationModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      preventDuplicates: false
    }),

    StoreModule.forRoot(rootReducer, { metaReducers }),
    StoreModule.forFeature('homeList', fromHomeStore.reducers),
    StoreModule.forFeature('AuthPage', fromLoginStore.reducers),
    StoreModule.forFeature('profile', fromProfileStore.reducers),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([...fromHomeStore.effects, ...fromLoginStore.effects, ...fromProfileStore.effects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  entryComponents: [IndicateComponent, LoginComponent],
  providers: [HomeService, LoginService, ProfileService, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
