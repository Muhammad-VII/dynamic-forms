import { Component } from '@angular/core';
import { DynamicFormComponent } from '../../forms/dynamic-form/dynamic-form.component';
import { DynamicFormArrayComponent } from '../../forms/dynamic-form-array/dynamic-form-array.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DynamicFormComponent, DynamicFormArrayComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
