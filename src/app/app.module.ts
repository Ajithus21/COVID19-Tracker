import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardCardsComponent } from './components/dashboard-cards/dashboard-cards.component';
import { GoogleChartsModule } from 'angular-google-charts';
@NgModule({
	declarations: [ AppComponent, NavbarComponent, HomeComponent, CountriesComponent, DashboardCardsComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		GoogleChartsModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
