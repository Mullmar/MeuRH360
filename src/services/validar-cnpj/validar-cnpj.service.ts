import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidarCnpjService {

  constructor() { }

  ValidarCNPJ(cnpj: any): boolean {
    // Remover caracteres não numéricos
    cnpj = cnpj?.replaceAll(".", "").replace("/", "").replace("-", "");

    // Verificar se tem 14 caracteres
    if (cnpj?.length !== 14) {
        return false;
    }

    // Verificar CNPJs com números repetidos (ex: 11111111111111)
    if (/^(\d)\1{13}$/.test(cnpj)) {
        return false;
    }

    // Validação do primeiro dígito verificador
    let soma = 0;
    let multiplicadores = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 12; i++) {
        soma += parseInt(cnpj.charAt(i)) * multiplicadores[i];
    }

    let digito1 = 11 - (soma % 11);
    digito1 = digito1 === 10 || digito1 === 11 ? 0 : digito1;

    if (parseInt(cnpj.charAt(12)) !== digito1) {
        return false;
    }

    // Validação do segundo dígito verificador
    soma = 0;
    multiplicadores = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 13; i++) {
        soma += parseInt(cnpj.charAt(i)) * multiplicadores[i];
    }

    let digito2 = 11 - (soma % 11);
    digito2 = digito2 === 10 || digito2 === 11 ? 0 : digito2;

    if (parseInt(cnpj.charAt(13)) !== digito2) {
        return false;
    }

    return true;
  }
}
