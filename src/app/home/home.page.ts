import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DatabaseService } from '../database';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  selectedSegment: any = "top"
  topRatedList: any[] = [];
  popularList: any[] = [];

  topPage: number = 1;
  popPage: number = 1;
  showLoader:boolean = false;
  sortby:any = "release_date.asc";

  constructor(
    public platform: Platform,
    public ds: DatabaseService,
    public httpClient: HttpClient, 
    public router: Router) { }

  ngOnInit() {
    this.showLoader = true;
    this.topPage = 1;
    this.popPage = 1;

    this.fetchTopRatedList();
    this.fetchPopularList();
  }

  getImageFullPath(endPath:String){
    return `https://image.tmdb.org/t/p/w500/${endPath}`;
  }

  onSort(){
    this.showLoader = true;
    this.topPage = 1;
    this.popPage = 1;

    this.fetchTopRatedList();
    this.fetchPopularList();
    console.log(this.sortby);
  }

  async fetchTopRatedList(){
    return new Promise(async (resolve) => {
      await this.httpClient.get('https://api.themoviedb.org/3/movie/top_rated?api_key=b6532f04ddec63af3d34821176fbcb14&language=en-US&page='+this.topPage+"&sort_by="+this.sortby).subscribe((response) => {
        this.topRatedList = this.topPage==1?response!['results']: [...this.topRatedList,...response!['results']];
        // console.log(this.topRatedList);
        this.showLoader = false;
        resolve(true);
      });
    });
    
  }

  async fetchPopularList(){
    return new Promise(async (resolve) => {
      await this.httpClient.get('https://api.themoviedb.org/3/movie/popular?api_key=b6532f04ddec63af3d34821176fbcb14&language=en-US&page='+this.popPage).subscribe((response) => {
        this.popularList = this.popPage==1?response!['results']: [...this.popularList,...response!['results']];
        console.log(this.popularList);
        this.showLoader = false;
        resolve(true);
      });
    });
  }

  async loadData(event:any, type:any){
    if(type == "popular"){
      this.popPage = this.popPage+1;
      await this.fetchPopularList();
      // console.log(response);
      event.target.complete();
    } else{
      this.topPage = this.topPage+1;
      var response  = await this.fetchTopRatedList();
      // console.log(response);
      event.target.complete();
    }
  }

  addToFav(movieDetails:any, event:Event){
    event.stopPropagation();
    // console.log(movieDetails);

    let checkQuery = `SELECT * FROM fav_list WHERE id=${movieDetails.id}`;
    this.ds.db.executeSql(checkQuery, []).then((data) =>{
        console.log(data.rows.item(0));
        if(data.rows.length == 0 ){
          let movieTitle = movieDetails.title.replace("'","\'");
          let insertToFav:any = `
            INSERT INTO fav_list
            (id, title, poster_path)
            VALUES
            (${movieDetails.id}, "${movieTitle}", "${movieDetails.poster_path}")
          `;
      
          this.ds.db.executeSql(insertToFav, []).then((data) =>{
            console.log(data);
          }, (error) => {
            console.log(error);
          });
        }
      }, (error) => {
        console.log(error);
      });
    

  }

  goDetails(movieId:any, event:any){
    // console.log(movieId);
    this.router.navigateByUrl('/details', { state: {movieId: movieId} });
  }

}
