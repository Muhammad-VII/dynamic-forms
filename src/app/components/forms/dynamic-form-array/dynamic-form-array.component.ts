import { Component, inject, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicFormsService } from '../../../services/dynamic-forms/dynamic-forms.service';
import { IFormConfig } from '../../../interfaces/form.dto';

@Component({
  selector: 'app-dynamic-form-array',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './dynamic-form-array.component.html',
  styleUrl: './dynamic-form-array.component.scss',
})
export class DynamicFormArrayComponent {
  dynamicFormService = inject(DynamicFormsService);
  form: FormGroup = new FormGroup({
    entries: new FormArray([]),
  });

  // Configuration for dynamic fields in each entry
  entryConfig = signal<IFormConfig[]>([]);

  constructor() {
    this.dynamicFormService.getFormConfig().subscribe((config) => {
      this.entryConfig.set(config);
      this.addEntry(); // Add an initial entry
    });
  }

  // Getter for easy access to entries FormArray
  get entries(): FormArray {
    return this.form.get('entries') as FormArray;
  }

  // Method to create a FormGroup dynamically based on config
  createEntryFormGroup() {
    const group = new FormGroup({});
    this.entryConfig().forEach((field) => {
      const control = new FormControl(
        '',
        field.required ? Validators.required : null
      );
      //? To Edit validators
      field.type === 'email' ? control.setValidators(Validators.email) : null;
      group.addControl(field.name, control);
    });
    return group;
  }

  // Method to add a new entry FormGroup to the entries FormArray
  addEntry() {
    this.entries.push(this.createEntryFormGroup());
  }

  // Method to remove an entry FormGroup from the entries FormArray
  removeEntry(index: number) {
    this.entries.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
