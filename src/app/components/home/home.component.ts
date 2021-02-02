import { Component, OnInit } from '@angular/core';
import { NotepadService } from 'src/app/services/notepad.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  notePads = [];
  gistAllFiles;
  objectValues = Object.values;

  constructor(private router: Router, private notepadService: NotepadService, private localStorageService: LocalStorageService) {
    let res = this.localStorageService.getAllGistData();
    if (res) {
      this.gistAllFiles = res.data;
      this.parseNotePads(this.gistAllFiles);
    }
  }

  ngOnInit(): void {
    this.allGist();
  }

  addNotepad() {
    this.router.navigate(['notepad']);
  }

  viewNotepad(notePad) {
    this.router.navigate(['notepad'], { queryParams: { id: notePad.id } });
  }

  async allGist() {
    let res = await this.notepadService.getAllGist();
    this.notePads = [];
    this.localStorageService.setAllGistData(res);
    this.gistAllFiles = res.data;
    this.parseNotePads(this.gistAllFiles);
  }

  parseNotePads(gistAllFiles) {
    for (let gistFile of gistAllFiles) {
      if (gistFile && gistFile.files && Object.values(gistFile.files).length) {
        let notePad = {};
        let gistVal: any = Object.values(gistFile.files)[0];
        notePad['id'] = gistFile.id;
        notePad['filename'] = gistVal.filename;
        notePad['name'] = gistVal.filename.split('.')[0];
        this.notePads.push(notePad);
      }
    }
  }
}
