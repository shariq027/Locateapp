import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { LocationService } from 'src/app/location.service';
import { ToasterService } from 'angular2-toaster';
import { Location } from 'src/app/interfaces/location-interface';

@Component({
  selector: 'map',
  templateUrl: '../Templates/Views/map.component.html',
  styleUrls: ['../Templates/CSS/map.component.css']
})
export class MapComponent implements OnInit {
  locationId: string;
  lat: number;
  lng: number;
  index: number;
  locations: Array<Location> = [];
  secondsCounter: any;
  slideStarted: boolean;
  locationName: string;
  locationAddress: string;
  isSingleClick: boolean;
  saveLocation: boolean;
  onLoad:boolean= true;
  defaultLocation:string;
  constructor(private route: ActivatedRoute,
    private router: Router, private locationService: LocationService, private toasterService: ToasterService) {
  }
  ngOnInit(): void {
    this.locationId = this.route.snapshot.paramMap.get('id');
    debugger
    this.locations = JSON.parse(localStorage.getItem('locations'));
    if(this.locations){
      this.setLocation();
    }
    else{
      this.router.navigate(["/locations"]);
    }
  }
  changeLocationWithFrequency() {
    this.secondsCounter.subscribe(n =>
      this.changeLocation()
    );
  }
  changeLocation() {
    if (this.index < this.locations.length && this.slideStarted) {
      this.lat = (+this.locations[this.index].lat);
      this.lng = (+this.locations[this.index].lon);
      this.getLocationDetails();
      this.index++;
    }

  }
  mapClickEvent(event: any) {
    debugger
    this.stopSlides();
    this.isSingleClick = true;
    setTimeout(() => {
      if (this.isSingleClick && event.coords) {
        this.lat = event.coords.lat;
        this.lng = event.coords.lng;
        this.saveLocation = true;
        this.getLocationDetails();
      }
    }, 1000);
  }
  getLocationDetails(): void {
    this.locationService.getLocationDetails(this.lat, this.lng)
      .subscribe((response: any) => {
        if (response.Response && response.Response.View.length > 0 && response.Response.View[0].Result.length > 0
          && response.Response.View[0].Result[0]) {
          let address: any = response.Response.View[0].Result[0];
          this.locationName = address.Location.Name ? address.Location.Name : "";
          this.onLoad ? this.defaultLocation = this.locationName :"";
          this.onLoad = false;
          this.locationAddress = address.Location.Address.Label ? address.Location.Address.Label:"";
          if (this.saveLocation) {
            let location:Location = { id: (this.locations.length + 1), name: this.locationName, lat: this.lat.toString(), lon: this.lng.toString() };
            this.locations.push(location);
            localStorage.setItem('locations', JSON.stringify(this.locations));
            this.index = this.locations.length - 1;
            this.saveLocation = false;
            this.toasterService.pop('success', '', 'Pinned location added to list');
          }
        }
        else {
          this.locationName = "Location details not available";
          this.locationAddress = "";
          this.saveLocation = false;
          this.toasterService.pop('error', '', 'Location details not available');
        }
      });
  }
  startSlides() {
    this.slideStarted = true;
    this.secondsCounter = interval(15000);
    this.changeLocationWithFrequency();
  }
  stopSlides() {
    this.slideStarted = false;
  }
  setLocation(){
    this.index = this.locations.findIndex(p => p.id == (+this.locationId));
    this.lat = (+this.locations[this.index].lat);
    this.lng = (+this.locations[this.index].lon);
    this.index++;
    this.getLocationDetails();
  }
}
