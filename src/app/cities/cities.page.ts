import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { Environment, GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, Marker } from '@ionic-native/google-maps';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {
  csvData: any;
  headerRow: any;
  map: GoogleMap;
  markers:any = [];

  constructor(public httpClient: HttpClient, public papa: Papa) { }

  ngOnInit() {
    this.httpClient.get('assets/worldcities.csv', {responseType: 'text'}).subscribe((response) => {
      this.extractData(response);
    });
    this.loadMap();
  }

  extractData(res:any) {
    this.papa.parse(res, {
      complete: parsedData => {
        this.headerRow = parsedData.data.splice(0, 1)[0];
        this.csvData = parsedData.data;
        console.log(this.csvData);

        this.markers = [];
        //=== Create Map Markers
        this.map.clear().then(() => {
          this.csvData.forEach(element => {
            this.map.addMarker({
              position: {lat:element[2], lng:element[3]},
            }).then((marker: Marker) => {
              this.markers.push(marker);
              marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                alert(element[0]);
              });
            });
          });
          
        });
      }
    });
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAmF3zBxA2VqPJzgMNhYt5HKvy2BKw1f1U',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAmF3zBxA2VqPJzgMNhYt5HKvy2BKw1f1U'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 0,
           lng: 0
         },
         zoom: 0,
         tilt: 0
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

  }

}
