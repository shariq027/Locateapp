import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }
  getLocations() {
    let configUrl = "../assets/locations.json"
    return this.http.get(configUrl);
  }

  getLocationDetails(latitude: number, longitude: number) {
    let hereMapsUri = "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=" + latitude + "%2C" + longitude + "%2C1000&mode=retrieveLandmarks&app_id=McVKl7wH01DojTbN0meN&app_code=Opa2_y9S5AFMki0ataxHoA&gen=9";
    let googlemapsUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=AIzaSyCbT6ZTCyO6T1zck-atVE2gW8ThvkE-O2w";
    return this.http.get(hereMapsUri);
  }
}
