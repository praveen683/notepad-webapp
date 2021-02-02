import { Injectable } from '@angular/core';
import { Octokit } from "@octokit/core";

@Injectable({
  providedIn: 'root'
})
export class NotepadService {

  constructor() { }

  getOctoKit() {
    return new Octokit({ auth: `1bd0f30a36d2f1c43573134a9b34c7fe30b1ae34` });
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

  
  getAllGist() {
    const octokit = this.getOctoKit();
    return octokit.request('GET /users/praveen683/gists')
  }
}
