import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Octokit } from "@octokit/core";

@Injectable({
  providedIn: 'root'
})
export class NotepadService {

  constructor() { }

  getOctoKit() {
    return new Octokit({ auth: `*************************` });
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
    return octokit.request('GET /users/praveen683/gists?flush_cache=true')
  }
}
