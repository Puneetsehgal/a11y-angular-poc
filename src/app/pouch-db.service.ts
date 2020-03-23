import { Injectable } from '@angular/core';
import ProductData from '../data/product_data.json';
import PouchDB from 'pouchdb';
import Find from 'pouchdb-find';

@Injectable({
  providedIn: 'root'
})

export class PouchDBService {
  // PouchDB.plugin(PouchFind);
  db = new PouchDB('eStore')

  constructor() { 
  }

  getOrCreateProductDB(){
    const self = this;
    PouchDB.plugin(Find);
    
    return self.db.info().then(function(dbInfo){
      if(dbInfo.doc_count > 0){
        console.info('DATABASE EXISTS');
        return {success: true};
      }else{
        console.info('CREATE NEW DATABASE');
        return self.db.bulkDocs(ProductData).then(function(){
          return {success: true};
        }).catch(function(error){
          return {success: false, error};
        });
      }
    }).catch(function(error){
      return {success: false, error};
    });
  }

  query(fields, query){
    const self = this;
    return self.db.createIndex({
      index: { fields }
    }).then(function(){
      return self.db.find(query)
    });
  }
  getSingleRow(product_id){
    return this.db.find({
      selector: { product_id }
    });
  }
}
