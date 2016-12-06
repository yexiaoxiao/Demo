import { Component } from '@angular/core';
import { Hero } from './hero';
@Component({
	moduleId:module.id,
	selector:'hero-form',
	templateUrl:'hero-form.component.html'
})
export class HeroFormComponent{
	powers = ['Really Smart','Super Flexible','Super Hot','Weater Changer'];
	model = new Hero(18,'Dr IQ',this.powers[0],'Chuck Overstreet');
	submitted = false;
	onSubmit(){
		this.submitted = true;
	}
	get diagnostic(){
		return JSON.stringify(this.model);
	}
	newHero(){
		this.model = new Hero(42,'','');
	}
	showFormControls(form:any){
		return form && form.controls['name'] && form.controls['name'].value;
	}
}