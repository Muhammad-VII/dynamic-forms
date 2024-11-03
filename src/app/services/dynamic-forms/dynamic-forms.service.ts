import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFormConfig } from '../../interfaces/form.dto';
@Injectable({
  providedIn: 'root',
})
export class DynamicFormsService {
  httpClient = inject(HttpClient);

  getFormConfig(): Observable<IFormConfig[]> {
    return this.httpClient.get<IFormConfig[]>(
      'http://localhost:4200/formConfig.json'
    );
  }
}
