import {Component} from '@angular/core';
// @Component({
// 	selector:'key-up2',
// 	template:
// 		// `<input (keyup) = 'onKey($event)' />
// 		// <p>{{values}}</p>`
// 		`<input #box (keyup)="onKey(box.value)" />
// 		<p>{{values}}</p>`
// })
@Component({
	selector:'key-up3',
	template:`<input #box (keyup.enter)="onEnter(box.value)" /><p>{{value}}</p>`
})


// export class keyUpComponent_v1{
// 	values = '';
// 	// onKey(event:any){
// 	// 	this.values += event.target.value + '|';
// 	// }
// 	onKey(event:KeyboardEvent){
// 		this.values += (<HTMLInputElement>event.target).value + '|';
// 	}	
// }

// export class keyUpComponent_v2{
// 	values = '';
// 	onKey(value:string){
// 		this.values += value + ' | ';
// 	}
// }

export class keyUpComponent_v3{
	value = '';
	onEnter(value:string){
		this.value = value;
	}
}