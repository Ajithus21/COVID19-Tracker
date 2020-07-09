import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSUmmery } from '../models/global-data';
import { DateWiseData } from '../models/date-wise-data';
@Injectable({
	providedIn: 'root'
})
export class DataService {
	d = new Date();
	n = this.d.toLocaleDateString();
	globaUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-06-2020.csv';
	dateWiseDataurl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
	constructor(private httpclient: HttpClient) {}
	getDateWiseData() {
		return this.httpclient.get(this.dateWiseDataurl, { responseType: 'text' }).pipe(
			map((result) => {
				let rows = result.split('\n');
				//console.log(rows);
				let mainData = {};
				let header = rows[0];
				let dates = header.split(/,(?=\S)/);

				dates.splice(0, 4);
				//console.log(dates);
				rows.splice(0, 1);
				rows.forEach((row) => {
					let cols = row.split(/,(?=\S)/);
					let con = cols[1];
					cols.splice(0, 4);
					mainData[con] = [];
					//console.log(con, cols);
					cols.forEach((value, index) => {
						let dw: DateWiseData = {
							cases: +value,
							country: con,
							date: new Date(Date.parse(dates[index]))
						};
						mainData[con].push(dw);
					});
				});
				//console.log(mainData);

				return mainData;
			})
		);
	}
	getGlobalData() {
		return this.httpclient.get(this.globaUrl, { responseType: 'text' }).pipe(
			map((result) => {
				let data: GlobalDataSUmmery[] = [];
				let raw = {};
				let rows = result.split('\n');
				rows.splice(0, 1);
				//console.log(rows);
				rows.forEach((row) => {
					let cols = row.split(/,(?=\S)/);
					//console.log(cols);

					let cs = {
						country: cols[3],
						confirmed: +cols[7],
						deaths: +cols[8],
						recovered: +cols[9],
						active: +cols[10]
					};
					let temp: GlobalDataSUmmery = raw[cs.country];
					if (temp) {
						temp.active = cs.active + temp.active;
						temp.confirmed = cs.confirmed + temp.confirmed;
						temp.deaths = cs.deaths + temp.deaths;
						temp.recovered = cs.recovered + temp.recovered;

						raw[cs.country] = temp;
					} else {
						raw[cs.country] = cs;
					}
				});
				//console.log(raw);
				return <GlobalDataSUmmery[]>Object.values(raw);
			})
		);
	}
}
