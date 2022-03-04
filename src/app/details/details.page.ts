import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  movieInfo:any;
  movieId:String = "";
  showLoader:boolean = false;
  constructor(public httpClient: HttpClient, public router: Router) { }
  
  ngOnInit() {
    this.showLoader = true;
    this.movieId = this.router?.getCurrentNavigation()?.extras.state.movieId;
    console.log(this.movieId);
    this.fetchDetails();
  }

  fetchDetails(){
    return new Promise(async (resolve) => {
      await this.httpClient.get(`https://api.themoviedb.org/3/movie/${this.movieId}?api_key=b6532f04ddec63af3d34821176fbcb14&language=en-US`).subscribe((response) => {
        this.movieInfo = response;
        console.log(this.movieInfo);
        this.showLoader = false;
        resolve(true);
      });
    });
  }

  getImageFullPath(endPath:String){
    return `https://image.tmdb.org/t/p/w500/${endPath}`;
  }

}
