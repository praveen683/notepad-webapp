import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getAllGistData() {
    return JSON.parse(window.localStorage.getItem("allGistData"));
  }

  setAllGistData(gistData) {
    window.localStorage.setItem('allGistData', JSON.stringify(gistData));
  }

  getGistDataById(id) {
    return JSON.parse(window.localStorage.getItem(id));
  }

  setGistDataById(id, gistData) {
    window.localStorage.setItem(id, JSON.stringify(gistData));
  }
}
