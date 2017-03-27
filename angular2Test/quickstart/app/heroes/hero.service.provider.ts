import { HeroService } from './hero.service';
import { Logger } from '../logger.service';
import { UserService } from '../user.service';
let heroServiceFactor = (logger:Logger,userService:UserService) => {
	return new HeroService(logger,userService.user.isAuthorized);
}

export let heroServiceProvider = {
	provide:HeroService,
	useFactory:heroServiceFactor,
	deps:[Logger,UserService]
}