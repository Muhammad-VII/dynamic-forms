import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicFormsService } from '../../../services/dynamic-forms/dynamic-forms.service';
import { IFormConfig } from '../../../interfaces/form.dto';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent {
  dynamicFormsServices = inject(DynamicFormsService);
  form: FormGroup = new FormGroup({});

  formConfig = signal<IFormConfig[]>([]);

  constructor() {
    this.dynamicFormsServices.getFormConfig().subscribe((res) => {
      this.formConfig.set(res);
      this.createForm(this.formConfig());
    });
  }

  createForm(config: IFormConfig[]) {
    config.forEach((field) => {
      const control = new FormControl(
        '',
        field.required ? Validators.required : null
      );
      this.form.addControl(field.name, control);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
