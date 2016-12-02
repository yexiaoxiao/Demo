import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { BackendService } from './backend.service';
@Injectable()

export class HeroService{
	private heroes:Hero[] = [];

	constructor(
		private backend:BackendService,
		private logger:Logger
		){}
	getHeroes(){
		this.backend.getAll(Hero).then((heroes:Hero[])=>{
			this.logger.log('Fetched ${heroes.length} heroes.');
			this.heroes.push(...heroes);
		});
		return this.heroes;
	}
}