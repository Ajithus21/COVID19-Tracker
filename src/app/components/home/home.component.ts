import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { GlobalDataSUmmery } from 'src/app/models/global-data';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	totalConfirmed: number = 0;
	totalActive: number = 0;
	totalDeaths: number = 0;
	totalRecoverd: number = 0;
	globalData: GlobalDataSUmmery[];
	dataTable = [];
	chart = {
		Piechart: 'PieChart',
		ColumnChart: 'ColumnChart',
		height: 500,
		options: {
			animation: {
				duration: 1000,
				easing: 'out'
			},
			is3D: true
		}
	};
	constructor(private dataservice: DataService) {}

	initChart(caseType: string) {
		this.dataTable = [];
		//this.dataTable.push([ 'country', 'cases' ]);
		this.globalData.forEach((cs) => {
			let value: number;
			if (caseType == 'c') {
				if (cs.confirmed > 2000) {
					value = cs.confirmed;
				}
			}
			if (caseType == 'a') {
				if (cs.active > 2000) {
					value = cs.confirmed;
				}
			}
			if (caseType == 'r') {
				if (cs.recovered > 2000) {
					value = cs.recovered;
				}
			}
			if (caseType == 'd') {
				if (cs.deaths > 1000) {
					value = cs.deaths;
				}
			}
			this.dataTable.push([ cs.country, value ]);
		});
		console.log(this.dataTable);
	}

	ngOnInit(): void {
		this.dataservice.getGlobalData().subscribe({
			next: (result) => {
				console.log(result);
				this.globalData = result;
				result.forEach((cs) => {
					if (!Number.isNaN(cs.confirmed)) {
						this.totalActive += cs.active;
						this.totalConfirmed += cs.confirmed;
						this.totalDeaths += cs.deaths;
						this.totalRecoverd += cs.recovered;
					}
				});
				this.initChart('c');
			}
		});
	}

	updateChart(input: HTMLInputElement) {
		console.log(input.value);
		this.initChart(input.value);
	}
}
