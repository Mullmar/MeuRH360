import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDataService } from '../../services/form-data/form-data.service';
import { MenuService } from '../../services/menu/menu.service';
import { AuthService } from '../../services/authentication/authentication.service';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, SidebarMenuComponent, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {
  formData: any;
  primeiroNome!: string;
  idUsuario: string | null = null;
  myForm!: FormGroup;

  constructor(
    private formDataService: FormDataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private authService: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.formData = navigation.extras.state['data'];
    }
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.formData && this.formData.nome) {
      this.primeiroNome = this.getFirstName(this.formData.nome);
      this.myForm.patchValue({
        idusuario: this.formData.idusuario,
        nome: this.formData.nome,
        bairro: this.formData.bairro,
        celular: this.formData.celular,
        cep: this.formData.cep,
        cidade: this.formData.cidade,
        cnpj: this.formData.cnpj,
        complemento: this.formData.complemento,
        cpf: this.formData.cpf,
        emailEmpresa: this.formData.emailEmpresa,
        endereco: this.formData.endereco,
        estado: this.formData.estado,
        nomeAdm: this.formData.nomeAdm,
        nomeEmpresa: this.formData.nomeEmpresa,
        tipoEmpresa: this.formData.tipoEmpresa
      });
      sessionStorage.setItem('nome', this.formData.nome);
    }
  }

   ngAfterViewInit(): void {
    this.menuService.setConsultAccId(this.myForm.get('idusuario')?.value);
   }

  initializeForm(): void {
    this.myForm = this.fb.group({
      idusuario: [''],
      nome: [''],
      bairro: [''],
      celular: [''],
      cep: [''],
      cidade: [''],
      cnpj: [''],
      complemento: [''],
      cpf: [''],
      emailEmpresa: [''],
      endereco: [''],
      estado: [''],
      nomeAdm: [''],
      nomeEmpresa: [''],
      tipoEmpresa: [''],
    });
  }

  getFirstName(fullName: string): string {
    const names = fullName.split(' ');
    return names[0];
  }

  editarForm(): void {
    if (this.myForm) {
      this.router.navigate(['edit-acc/'], { state: { data: this.myForm.value } });
    } else {
      console.error('Erro: formData está nulo.');
    }
  }

  isRegistered(): boolean {
    return this.authService.isUserRegistered();
  }
}
