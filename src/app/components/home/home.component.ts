import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NotepadService } from 'src/app/services/notepad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  notePads = [];
  gistAllFiles;
  objectValues = Object.values;

  constructor(private router: Router, private notepadService: NotepadService) { }

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
