import { Component } from '@angular/core';
import { Car,Engine,Tires } from './car';
import { Car as CarNoDi } from './car-no-di';
import { CarFactory } from './car-factory';
import { testCar,simpleCar,superCar} from './car-creations';
import { useInjector } from './car-injector';
@Component({
	selector:'my-car',
	template:`
		<h2>Cars</h2>
		<div id="di">{{car.dirve()}}</div>
		<div id="nodi">{{noDiCar.drive()}}</div>
		<div id="injector">{{injectorCar.drive()}}</div>
		<div id="factor">{{factorCar.drive()}}</div>
		<div id="simple">{{simpleCar.drive()}}</div>
		<div id="siper">{{superCar.drive()}}</div>
		<div id="test">{{testCar.drive()}}</div>
	`,
	providers:[Car,Engine,Tires]
})

export class CarComponent{
	factoryCar = (new CarFactory).createCar();
	injector = useInjector();
	noDiCar = new CarNoDi;
	simpleCar = simpleCar();
	superCar = superCar();
	testCar = testCar();
	constructor(public car:Car){}
}