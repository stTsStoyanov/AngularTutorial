import { Component, Inject, Output } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';

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


  //When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService.
  // heroService become instance of HeroService!
  constructor(private heroService: HeroService){ 
    
  }

  heroes: Hero[] = [];
  selectedHero?: Hero;

  onSelect(hero: Hero){
    this.selectedHero = hero;
  }
  @Output() selected = this.selectedHero;

  //old synchronous version
  // getHeroes(){
  //   this.heroes = this.heroService.getHeroes();
  // }

  getHeroes(){
    this.heroService.getHeroes()
    //return promise in the callback
      .subscribe(heroes =>{
        this.heroes = heroes;
      })
  }

  //getHeroes() inside the ngOnInit lifecycle hook let Angular call ngOnInit() at an appropriate time after constructing a HeroesComponent instance.
  // when the component is created, get all the heroes from the service and inject them in heroes prop, which is used to render the list
  ngOnInit(){
    this.getHeroes();
  }
}
