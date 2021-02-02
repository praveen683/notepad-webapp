import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getFieldErrorMessage } from '../../utils/utilities';
import { Custom_Validation_Messages } from './validation-messages';
import { NotepadService } from '../../services/notepad.service'
@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.less']
})
export class NotepadComponent implements OnInit {
  notepadForm: FormGroup;
  custom_validation_messages = Custom_Validation_Messages;

  constructor(private fb: FormBuilder,private notepadService: NotepadService) { }

  ngOnInit(): void {
    this.notepadForm = this.fb.group({
      name: [''],
    });
  }

  async getGistData() {
    const response = await this.notepadService.getData();
    console.log('gist data --> ', response);
  }

  getFormErrorMessage(formGroup, controlName): string {
    return getFieldErrorMessage(formGroup, controlName, Custom_Validation_Messages);
  }

}
