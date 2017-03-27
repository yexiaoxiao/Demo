import { Component } from '@angular/core';
import { HeroService } from './heroes/hero.service';
import { HeroListComponent } from './heroes/hero-list.component';
@Component({
	selector:'my-tests',
	template:`
		<h2>Tests</h2>
		<p id="tests">Tests{{results.pass}}</p>
	`
})
export class TestComponent{
	results = runTests();
}

function runTests(){
	let expectedHeroes = [{name:'A'},{name:'B'}]
	let mockService = <HeroService> {getHeroes:() => expectedHeroes}
	it('shoule have heroes when HeroListComponent created',()=>{
		let hlc = new HeroListComponent(mockService);
		expect(hlc.heroes.length).toEqual(expectedHeroes.length);
	});
	return testResults;
}
var testName:string;
var testResults:{pass:string;message:string};
function expect(actual:any){
	return{
		toEqual:function(expected:any){
			testResults = actual === expected ? 
			{pass:'passed',message:testName}:
			{pass:'failed',message:`${testName};expected ${actual} to equal ${expected}.`}
		}
	};
}

function it(label:string,test:()=>void){
	testName = label;
	test();
}