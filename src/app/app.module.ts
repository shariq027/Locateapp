import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from 'src/app/components/header.component';
import { Routes,RouterModule } from '@angular/router'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationsComponent } from 'src/app/components/locations.component';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from 'src/app/components/map.component';
import { AgmCoreModule } from '@agm/core';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  {path:'locations', component : LocationsComponent},
  {path:'', redirectTo:'/locations', pathMatch : 'full'},
  {path:'locations/:id', component : MapComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LocationsComponent,
    MapComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCbT6ZTCyO6T1zck-atVE2gW8ThvkE-O2w'
    }),
    HttpClientModule,
    ToasterModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
