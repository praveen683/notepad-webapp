import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.less']
})
export class NotepadComponent implements OnInit {
  notepadForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.notepadForm = this.fb.group({
      name: [''],
    });
  }

}
