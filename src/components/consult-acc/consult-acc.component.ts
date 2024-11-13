import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/authentication/authentication.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SidebarMenuComponent } from "../sidebar-menu/sidebar-menu.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consult-acc',
  standalone: true,
  imports: [SidebarMenuComponent, CommonModule],
  templateUrl: './consult-acc.component.html',
  styleUrl: './consult-acc.component.scss'
})
export class ConsultAccComponent {
  id: any;
  reg!: boolean;
  form!: FormGroup;
  responseData: any;

  constructor(private route:ActivatedRoute,
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private fb: FormBuilder,
    private router: Router,) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if(this.authService.isUserRegistered()) {
      this.reg = true;
      this.GetUsuarioById(this.id);
    } else {
      this.reg = false;
    }
  }

  GetUsuarioById(id: any) {
    this.usuariosService.GetUsuarioById(id).subscribe({next: response => {
        this.responseData = response;
        this.form = this.fb.group({
          idusuario: this.responseData.userID,
          nomeEmpresa: this.responseData.nomeEmpresa,
          cnpj: this.responseData.cnpj,
          nomeAdm: this.responseData.nomeAdm,
          cpf: this.responseData.cpf,
          emailEmpresa: this.responseData.emailEmpresa,
          celular: this.responseData.celular,
          cep: this.responseData.cep,
          endereco: this.responseData.endereco,
          bairro: this.responseData.bairro,
          cidade: this.responseData.cidade,
          complemento: this.responseData.complemento,
          emailUser: this.responseData.emailUser,
          estado: this.responseData.estado,
          nome: sessionStorage.getItem('nome'),
          tipoEmpresa: this.responseData.tipoEmpresa
        });
      },
      error: (error) => {
        console.error('Erro:', error);
      }
    });
  }

  editarForm() {
    if(this.reg) {
      const formData = { ...this.form?.value };
      this.router.navigate(['edit-acc/'], { state: { data: formData } });
     } else {
       this.router.navigate(['edit-acc/' + this.id]);
     }
  }
}
