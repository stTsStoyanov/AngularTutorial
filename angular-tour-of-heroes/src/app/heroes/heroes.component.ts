import { Component, Inject, OnInit, Output } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  //When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService.
  // heroService become instance of HeroService!
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  heroes: Hero[] = [];
  selectedHero?: Hero;

  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
  @Output() selected = this.selectedHero;

  //old synchronous version
  // getHeroes(){
  //   this.heroes = this.heroService.getHeroes();
  // }

  getHeroes() {
    this.heroService.getHeroes()
      //return promise in the callback
      .subscribe(heroes => {
        this.heroes = heroes;
      })
  }

  //getHeroes() inside the ngOnInit lifecycle hook let Angular call ngOnInit() at an appropriate time after constructing a HeroesComponent instance.
  // when the component is created, get all the heroes from the service and inject them in heroes prop, which is used to render the list
  ngOnInit() {
    this.getHeroes();
  }

  add(name: string){
    name = name.trim();
    if(!name){ return };
    this.heroService.addHero({ name } as Hero)
      .subscribe( hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero){
    this.heroes = this.heroes.filter(element => element !== hero);
    this.heroService.deleteHero(hero.id)
      .subscribe() //although We do not need to handle any response, .subscribe() is a must
  }
}
