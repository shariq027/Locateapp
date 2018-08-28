import { Component } from '@angular/core';
import { LocationService } from 'src/app/location.service';
import { OnInit } from '@angular/core';
import { Location } from 'src/app/interfaces/location-interface';

@Component({
    selector: 'locations',
    templateUrl: '../Templates/Views/locations.component.html',
    styleUrls: ['../Templates/CSS/locations.component.css']
})
export class LocationsComponent implements OnInit {
    locations: Array<Location> = [];
    constructor(private locationService: LocationService) {
    }
    ngOnInit(): void {
        if(localStorage.getItem('locations')){
            this.locations = JSON.parse(localStorage.getItem('locations'));
        }
        else{
            this.getLocations();
        }
    }
    getLocations(): void {
        this.locationService.getLocations()
            .subscribe((response:Array<Location>) => {
                if (response) {
                    this.locations = response;
                    localStorage.setItem('locations', JSON.stringify(this.locations));
                }
            });
    }
}
