import {Component} from '@angular/core';
@Component({
	selector:'click-me',
	template:`<button (click)="onClickMe()">click me!</button>
				{{clickMessage}}`
})

export class clickMeCoponent{
	clickMessage = '';

	onClickMe(){
		this.clickMessage = 'You are my Hero!';
	}
}