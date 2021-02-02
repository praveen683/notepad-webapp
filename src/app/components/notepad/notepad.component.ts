import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray } from '@angular/forms';
import { getFieldErrorMessage } from '../../utils/utilities';
import { Custom_Validation_Messages } from './validation-messages';
import { NotepadService } from '../../services/notepad.service'
import { v1 as uuidv1 } from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.less']
})
export class NotepadComponent implements OnInit {
  notepadForm: FormGroup;
  notesForm: FormGroup;
  notesFormArray: any;
  custom_validation_messages = Custom_Validation_Messages;
  notepadData = [];
  currentNavState;
  notepadId;

  constructor(private fb: FormBuilder, private notepadService: NotepadService, private router: Router, private route: ActivatedRoute) {
    this.currentNavState = this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state;
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.notepadId = params.id;
    }
    );
  }

  ngOnInit(): void {
    this.notepadForm = this.fb.group({
      name: [''],
    });
    this.notesForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      text: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1000)])],
    });

    this.notesFormArray = this.fb.group({
      notes: this.fb.array([])
    });

    if (this.notepadId) {
      this.getGistData(this.notepadId);
    }
  }

  async getGistData(id) {
    const response = await this.notepadService.getData(id);
    if (response.data.files && Object.values(response.data.files)) {
      let gistVal: any = Object.values(response.data.files)[0];
      this.notepadData = gistVal.content && JSON.parse(gistVal.content).notes;
      let notePadName = gistVal.content && JSON.parse(gistVal.content).name;

      for (let note of this.notepadData) {
        this.addNotetoArray(note);
      }

      this.notepadForm.patchValue({
        name: notePadName
      });
    }
  }

  get notesArray(): FormArray {
    return this.notesFormArray.get("notes") as FormArray;
  }

  newNote(note): FormGroup {
    return this.fb.group({
      id: note.id,
      title: [note.title, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      text: [note.text, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1000)])],
    });
  }

  addNotetoArray(note) {
    this.notesArray.push(this.newNote(note));
  }

  removeNoteFromArray(i: number) {
    this.notesArray.removeAt(i);
  }

  onFormArraySave(i) {

  }

  async addNote(notesFormDirective: FormGroupDirective) {
    let formVal = this.notesForm.value;
    const randomId = uuidv1();
    formVal['id'] = randomId;
    this.addNotetoArray(formVal);
    setTimeout(() => {
      notesFormDirective.resetForm();
    }, 0);
  }

  deleteNote(id) {
    this.notepadData = this.notepadData.filter(obj => obj.id !== id);
  }

  async saveNotepad() {
    let req = { name: '', notes: [] };
    let formArrVal = this.notesFormArray.value;
    console.log('formArrVal', formArrVal.notes);
    req.name = this.notepadForm.controls['name'].value;
    req.notes = formArrVal.notes || [];
    let fileName = req.name + ".json";
    let reqBody = {
      files: {
        [fileName]: { content: JSON.stringify(req) }
      },
      public: true
    }
    if (this.notepadId) {
      await this.notepadService.updateData(this.notepadId, reqBody);
    } else {
      await this.notepadService.createGist(reqBody);
    }
    this.router.navigate(['home']);
  }

  async deleteNotepad() {
    if (this.notepadId) {
      await this.notepadService.deleteGist(this.notepadId);
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['home']);
    }
  }

  getFormErrorMessage(formGroup, controlName): string {
    return getFieldErrorMessage(formGroup, controlName, Custom_Validation_Messages);
  }

}
