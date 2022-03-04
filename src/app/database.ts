
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';

@Injectable()
export class DatabaseService {
    public db: SQLiteObject;
    // public isOpen: boolean;
    // dbCreated:boolean  = false;
    categoryLength = 0;

    constructor(public storage: SQLite) {
        
    }

    async loadDatabase(){
        await this.storage.create({ name: "data.db", location: "default" })
        .then(async (db: SQLiteObject) => {
            this.db = db;

            let createQuery = `
              CREATE TABLE IF NOT EXISTS fav_list 
              (id INTEGER, title TEXT, poster_path TEXT)`;
            await this.db.executeSql(createQuery, [])
            .then(res => console.log('Executed SQL', res))
            .catch(e => console.log(e));

        });

        
    }
}