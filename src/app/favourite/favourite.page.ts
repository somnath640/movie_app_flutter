import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {
  favList:any[] = [];
  showLoader:boolean = false;

  constructor(public ds: DatabaseService) { }

  ngOnInit() {
    this.showLoader = true;
    let getAllFevData = `SELECT * FROM fav_list`;
    this.ds.db.executeSql(getAllFevData, []).then((data) =>{
      console.log(data.rows.item(0));
      this.favList = [];
      for(let i=0; i < data.rows.length; i++){
        this.favList.push(data.rows.item(i));
      }
      this.showLoader = false;
    }, (error) => {
      console.log(error);
    });
  }

  getImageFullPath(endPath:String){
    return `https://image.tmdb.org/t/p/w500/${endPath}`;
  }

}
