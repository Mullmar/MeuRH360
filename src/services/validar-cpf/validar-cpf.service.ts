import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidarCpfService {

  constructor() { }

  ValidarCPF(strCPF: any): boolean {
    var cpfFormatado = strCPF?.replaceAll(".", "").replace("-", "");
    //console.log(cpfFormatado);
    var Soma;
    var Resto;
    Soma = 0;
  if (cpfFormatado == "00000000000") return false;

  for (var i=1; i<=9; i++) Soma = Soma + parseInt(cpfFormatado?.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpfFormatado?.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpfFormatado?.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpfFormatado?.substring(10, 11) ) ) return false;
    return true;
  }
}
