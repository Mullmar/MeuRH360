import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isRegistered = false;

  constructor() { }

  // Método para verificar se o usuário está cadastrado
  isUserRegistered(): boolean {
    return this.isRegistered;
  }

  // Método para registrar o usuário
  registerUser(): void {
    this.isRegistered = true;
  }

  // Método para desregistrar o usuário
  unregisterUser(): void {
    this.isRegistered = false;
  }
}
