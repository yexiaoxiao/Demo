import { Engine,Tires,Car } from './car';
export class CarFactory{
	createCar(){
		let car = new Car(this.createEngine(),this.createTires());
		car.description = 'Factoy';
		return car;
	}
	createEngine(){
		return new Engine();
	}
	createTires(){
		return new Tires();
	}
}