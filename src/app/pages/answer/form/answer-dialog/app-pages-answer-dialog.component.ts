import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppPagesAnswerFormComponent } from '../app-pages-answer-form.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'mr-app-pages-answer-dialog',
  templateUrl: 'app-pages-answer-dialog.component.html',
  styleUrls: [ './app-pages-answer-dialog.component.scss' ],
})
export class AppPagesAnswerDialogComponent {
  nameFormGroup = this.formBuilder.group({
    name: [ '', Validators.required ],
  });

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AppPagesAnswerFormComponent>,
              @Inject(MAT_DIALOG_DATA) public answerer: string) {
  }

  onSubmit() {
    this.dialogRef.close(this.nameFormGroup.controls['name'].value);
  }
}
