import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

//component with input, button and containing other component "housing-location-component"
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
  ],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location
      *ngFor="let housingLocation of filteredLocationList"[housingLocation]="housingLocation"> 
      <!-- looping through the array and passing data to other component. -->
    </app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  housingLocationList: HousingLocation[] = [];
  housingService : HousingService = inject(HousingService); //injecting dependency service where i have all information and few methods

  filteredLocationList: HousingLocation[] = []; //hold the values that match the search criteria entered by the user
  
  constructor(){

    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });

    //old version, working with synchronous version of the service, now we are with updated version of the service where we use server
    //this.housingLocationList = this.housingService.getAllHousingLocations(); //In the property which is array I got all the data by the method provided by the service!
    //this.filteredLocationList = this.housingLocationList; //contain the total set of housing locations values by default when the page loads
  }

  filterResults(text: string){
    if(!text){
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList.filter(
        housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
      );
  }

  // housingLocation: HousingLocation = {
  //   id: 9999,
  //   name: 'Test Home',
  //   city: 'Test city',
  //   state: 'ST',
  //   photo: `${this.baseUrl}/example-house.jpg`,
  //   availableUnits: 99,
  //   wifi: true,
  //   laundry: false,
  // };
}
