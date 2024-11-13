import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../services/form-data/form-data.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/authentication/authentication.service';
import { HandleErrorService } from '../../services/handle-error/handle-error.service';

@Component({
  selector: 'app-create-acc',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-acc.component.html',
  styleUrls: ['./create-acc.component.scss']
})
export class CreateAccComponent implements OnInit {
  myForm: FormGroup;
  responseData!: any;
  idUsuario: any = 0;
  errorMessages: string[] = [];

  constructor(private formDataService: FormDataService,
    private usuariosService: UsuariosService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private handleErrorService: HandleErrorService) {

      this.myForm = this.fb.group({
        idusuario: ['', Validators.minLength(1)],
        nome: ['', [Validators.required]],
        emailuser: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        pwdcf: ['', [Validators.required, Validators.minLength(6)]],
        termos: [false, [Validators.requiredTrue]]
      });
    }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.myForm.patchValue({
      nome: sessionStorage.getItem('nome')
    });
  }

  onSubmit(): void {
    this.formDataService.updateFormData(this.myForm.value);
    var minhaDiv = document.getElementById('rowResult');
    var minhaDivErro = document.getElementById('rowErro');
    if (this.myForm.valid) {
      const formValues = this.myForm.value;
      this.myForm.get('idusuario')?.patchValue(this.idUsuario);
      this.usuariosService.addUsuario(formValues).subscribe
        ({ next: (response) => {
          this.responseData = response;
          this.myForm.get('idusuario')?.patchValue(this.responseData.idusuario);

          if (minhaDiv) {
            minhaDiv.style.display = 'block';
          }

          this.authService.unregisterUser();

          setTimeout(() => {
            if (minhaDiv) {
              minhaDiv.style.display = 'none';
            }
          }, 4000);

          setTimeout(() => {
            this.router.navigate(['index'], { state: { data: this.myForm.value } });
          }, 6000);
         },
         error: (error) => {
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
      ;
    }
  }

  get formControls() {
    return this.myForm.controls;
  }

  hasPasswordMismatchError(): boolean {
    const pwdControl = this.myForm.get('senha');
    const pwdcfControl = this.myForm.get('pwdcf');
    return pwdControl && pwdcfControl ? pwdControl.value !== pwdcfControl.value : false;
  }
}
