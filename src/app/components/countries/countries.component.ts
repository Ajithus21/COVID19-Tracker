import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { GlobalDataSUmmery } from 'src/app/models/global-data';
import { FormControl, FormGroup } from '@angular/forms';
import { DateWiseData } from 'src/app/models/date-wise-data';

@Component({
	selector: 'app-countries',
	templateUrl: './countries.component.html',
	styleUrls: [ './countries.component.css' ]
})
export class CountriesComponent implements OnInit {
	totalConfirmed: number = 0;
	totalActive: number = 0;
	totalDeaths: number = 0;
	totalRecoverd: number = 0;
	dateWiseData;
	selectedCountryData: DateWiseData[];
	data: GlobalDataSUmmery[];
	countries: string[] = [];
	dataTable = [];
	chart = {
		LineChart: 'LineChart',
		height: 500,

		options: {
			animation: {
				duration: 1000,
				easing: 'out'
			}
		}
	};
	constructor(private datservice: DataService) {}

	ngOnInit(): void {
		this.datservice.getGlobalData().subscribe((result) => {
			this.data = result;
			this.data.forEach((cs) => {
				this.countries.push(cs.country);
			});
		});
		this.datservice.getDateWiseData().subscribe((result) => {
			this.dateWiseData = result;
			this.updateChart();
			//console.log(result);
		});
	}

	updateChart() {
		this.selectedCountryData.forEach((cs) => {
			this.dataTable.push([ cs.cases, cs.date ]);
		});
	}

	updateValues(country: string) {
		console.log(country);
		this.data.forEach((cs) => {
			if (cs.country == country) {
				this.totalActive = cs.active;
				this.totalConfirmed = cs.confirmed;
				this.totalDeaths = cs.deaths;
				this.totalRecoverd = cs.recovered;
			}
		});

		this.selectedCountryData = this.dateWiseData[country];
		//console.log(this.selectedCountryData);
		this.updateChart();
		let d = new Date();
		let n = d.toLocaleDateString();
		console.log(n);
	}
}
