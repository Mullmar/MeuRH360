import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {
  errorMessages: string[] = [];

  constructor() { }

  handleError(error: any): string[] {

    if (error.error) {
      const errorFields = error.error;
      console.log('erro cnpj: ' + error.error);
      for (const field in errorFields) {
        const fieldErrors = errorFields[field];
        if (errorFields.hasOwnProperty(field)) {

          fieldErrors.forEach((message: string) => {
            this.errorMessages.push(`${field}: ${message}`);
          });
        }else { this.errorMessages.push(`${field}: ${fieldErrors}`); }
      }
    } else {
      this.errorMessages.push('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
    }

    return this.errorMessages;
  }
}
