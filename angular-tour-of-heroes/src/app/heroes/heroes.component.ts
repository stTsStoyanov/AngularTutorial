import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  //old version, now we have list with heroes named HEROES comming from ../mock-heroes
  // hero: Hero ={
  //   id:1,
  //   name: 'Windstorm'
  // };

  heroes = HEROES;
  selectedHero?: Hero;

  onSelect(hero: Hero){
    this.selectedHero = hero;
  }
}
