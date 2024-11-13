import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu/menu.service';
import { SidebarMenuComponent } from "../sidebar-menu/sidebar-menu.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDataService } from '../../services/form-data/form-data.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authentication/authentication.service';
import { BuscarCEPService } from '../../services/buscar-cep/buscar-cep.service';
import { ValidarCpfService } from '../../services/validar-cpf/validar-cpf.service';
import { ValidarCnpjService } from '../../services/validar-cnpj/validar-cnpj.service';
import { HandleErrorService } from '../../services/handle-error/handle-error.service';

declare function MascaraCNPJ(input: any): void;
declare function MascaraCPF(input: any): void;
declare function MascaraCEP(input: any): void;
declare function MascaraCelular(input: any): void;

@Component({
  selector: 'app-edit-acc',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarMenuComponent],
  templateUrl: './edit-acc.component.html',
  styleUrl: './edit-acc.component.scss'
})
export class EditAccComponent implements OnInit {

  formEdit!: FormGroup;
  responseData: any;
  usuaID: any;
  nome: any;
  errorMessages: string[] = [];
  cepValido: boolean = false;


  constructor(private router: Router,
    private fbuilder: FormBuilder,
    private formDataService: FormDataService,
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private menuService: MenuService,
    private buscarCEPService: BuscarCEPService,
    private validarCPFService: ValidarCpfService,
    private validarCNPJService: ValidarCnpjService,
    private handleErrorService: HandleErrorService,
    private activatedRoute: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    //console.log(navigation?.extras.state);
    //console.log('formData: ' + this.formEdit);
    if (navigation?.extras.state) {
      this.responseData = navigation.extras.state['data'];
      if(this.responseData) {
        this.nome = this.responseData.nome;
        this.usuaID = this.responseData.idusuario;
      }
    } else {
        this.usuaID = this.activatedRoute.snapshot.paramMap.get('id');
        this.nome = sessionStorage.getItem('nome');
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    if (!this.responseData) {
      console.error('responseData não foi inicializado corretamente');
    }
  }

  initializeForm(): void {
    this.formEdit = this.fbuilder.group({
      userID: [this.usuaID, Validators.minLength(1)],
      nome: [this.responseData ? this.nome : sessionStorage.getItem('nome'), Validators.maxLength(255)],
      tipoEmpresa: [this.responseData ? this.responseData.tipoEmpresa : '', Validators.maxLength(50)],
      nomeEmpresa: [this.responseData ? this.responseData.nomeEmpresa : '', [Validators.required, Validators.maxLength(255)]],
      cnpj: [this.responseData ? this.responseData.cnpj : '', [Validators.required, Validators.minLength(11),  Validators.maxLength(18)]],
      cep: [this.responseData ? this.responseData.cep : '', [Validators.maxLength(9)]],
      endereco: [this.responseData ? this.responseData.endereco : '', [Validators.maxLength(255)]],
      bairro: [this.responseData ? this.responseData.bairro : '', [Validators.maxLength(50)]],
      estado: [this.responseData ? this.responseData.estado : '', [Validators.minLength(2), Validators.maxLength(2)]],
      cidade: [this.responseData ? this.responseData.cidade : '', [Validators.maxLength(50)]],
      complemento: [this.responseData ? this.responseData.complemento : '', [Validators.maxLength(50)]],
      celular: [this.responseData ? this.responseData.celular : '', [Validators.required, Validators.minLength(8)]],
      nomeAdm: [this.responseData ? this.responseData.nomeAdm : '', [Validators.required, Validators.maxLength(255)]],
      cpf: [this.responseData ? this.responseData.cpf : '', [Validators.required, Validators.minLength(11),  Validators.maxLength(14)]],
      emailEmpresa: [this.responseData ? this.responseData.emailEmpresa : '', [Validators.required, Validators.maxLength(75)]],
    });
  }

  onSubmit(): void {
    var minhaDivErro = document.getElementById('rowErro');
    this.formDataService.updateFormData(this.formEdit.value);
    if (this.formEdit.valid) {
      const cleanedCnpj = this.formEdit.get('cnpj')?.value.replaceAll(".", "").replace("/", "").replace("-", "");
      const cleanedCpf = this.formEdit.get('cpf')?.value.replaceAll(".", "").replace("-", "");
      const cleanedCep = this.formEdit.get('cep')?.value.replace("-", "");
      const cleanedCelular = this.formEdit.get('celular')?.value.replace("-", "");
      const formatedComplemento = this.formEdit.get('complemento')?.value === null ? '' : this.formEdit.get('complemento')?.value.replace("-", "");
      this.formEdit.patchValue({
        cnpj: cleanedCnpj,
        cpf: cleanedCpf,
        cep: cleanedCep,
        celular: cleanedCelular,
        nome: this.nome,
        complemento: formatedComplemento
      });
      this.usuariosService.editUsuario(this.formEdit.value).subscribe
      ({ next: (response) => {
        this.responseData = response;
        this.authService.registerUser();
        const formValues = this.formEdit.value;
        const minhaDiv = document.getElementById('rowResult');
        if (minhaDiv) {
          minhaDiv.style.display = 'block';
        }
        formValues.idusuario = this.responseData.idusuario;

        setTimeout(() => {
          if (minhaDiv) {

            minhaDiv.style.display = 'none';
          }
        }, 4000);

        setTimeout(() => {
          this.router.navigate(['index'], { state: { data: formValues } });
        }, 6000);

      },
      error: (error) => {
        console.error('Erro:', error);
        if (minhaDivErro) {
          this.errorMessages = this.handleErrorService.handleError(error);
          minhaDivErro.style.display = 'block';
        }
        setTimeout(() => {
          if (minhaDivErro) {
            minhaDivErro.style.display = 'none';
          }
        }, 4000);
      }
    });
  }
}

  get formControls() {
    return this.formEdit.controls;
  }



  ValidarCPF(strCPF: any): boolean {
    return this.validarCPFService.ValidarCPF(strCPF);
  }

  ValidarCNPJ(strCNPJ: any): boolean {
    return this.validarCNPJService.ValidarCNPJ(strCNPJ);
  }

  BuscarCep(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cep = input.value;

    if (cep.length !== 9) {
      console.error('Erro:', 'Cep inválido');
    }

    this.buscarCEPService.BuscarCep(cep).subscribe({ next: (data) => {
      if (data.erro) {
        this.cepValido = false;
        console.error('Erro:', data.erro);
      }

      // Atualiza os campos do formulário com os dados retornados do CEP
      this.formEdit.patchValue({
        endereco: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
      });
      this.cepValido = true;
      }, error: (error) => {
        this.cepValido = false;
        console.error("Erro ao buscar o CEP:", error);
      }
    });
  }

  ngAfterViewInit() {
    this.applyMask();
    this.menuService.setConsultAccId(this.formEdit.get('userID')?.value);
    this.findInvalidControls();
  }

  applyMask() {
    MascaraCNPJ('#cnpjEmpresa');
    MascaraCelular('#celular');
    MascaraCEP('#cep');
    MascaraCPF('#cpf')
  }

  findInvalidControls() {
    const invalidControls = [];
    const controls = this.formEdit.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);
      }
    }
    console.log('Controles inválidos: ', invalidControls);
  }
}
