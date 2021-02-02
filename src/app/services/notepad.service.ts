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

  getData() {
    const octokit = this.getOctoKit();
    return octokit.request('GET /gists/9cb09ea53c3e40c2f6dfbb2c12c88cb7');
  }
}
