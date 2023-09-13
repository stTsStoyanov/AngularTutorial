import { Injectable, importProvidersFrom } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  //typical service-in-service scenario
  constructor(private messageService: MessageService) { }

  //old synchronous version
  // getHeroes() :Hero[]{
  //   return HEROES;
  // }

  //new asynchronous version!
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
}
