import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {

  hero?: Hero;

  constructor(private heroService: HeroService,
              private location: Location,
              private route: ActivatedRoute
  ) { }

  // @Input() hero?: Hero;

  getHero(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero)
  }

  ngOnInit(){
    this.getHero();
  }

  goBack(){
    this.location.back();
  }
  
}
