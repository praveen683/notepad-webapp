import { Injectable } from '@angular/core';
import { Octokit } from "@octokit/core";

@Injectable({
  providedIn: 'root'
})
export class NotepadService {

  constructor() { }
  
  getOctoKit() {
    let tokenKey = ['2f8385', '549f3a4', 'fc5d2af', 'ec44e8', '2ce5fa8e','dc6520'];
    let token = '';
    for (let key of tokenKey) {
      token = token + key;
    }
    return new Octokit({ auth: token });
  }

  getData(id) {
    const octokit = this.getOctoKit();
    return octokit.request(`GET /gists/${id}`);
  }

  updateData(id, reqBody) {
    const octokit = this.getOctoKit();
    return octokit.request(`PATCH /gists/${id}`, reqBody);
  }

  createGist(reqBody) {
    const octokit = this.getOctoKit();
    return octokit.request('POST /gists', reqBody)
  }

  deleteGist(id) {
    const octokit = this.getOctoKit();
    return octokit.request(`DELETE /gists/${id}`)
  }

  getAllGist() {
    const octokit = this.getOctoKit();
    let salt = Date.now()
    return octokit.request(`GET /users/praveen683/gists?salt=${salt}`)
  }
}
