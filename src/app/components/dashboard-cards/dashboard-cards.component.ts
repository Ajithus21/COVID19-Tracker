import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-dashboard-cards',
	templateUrl: './dashboard-cards.component.html',
	styleUrls: [ './dashboard-cards.component.css' ]
})
export class DashboardCardsComponent implements OnInit {
	@Input('totalConfirmed') totalConfirmed;
	@Input('totalDeaths') totalDeaths;
	@Input('totalRecoverd') totalRecoverd;
	@Input('totalActive') totalActive;
	constructor() {}

	ngOnInit(): void {}
}
