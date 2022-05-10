import { Component, OnInit } from '@angular/core';
import { CorrentistaService } from './../../services/correntista.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { GlobalService } from './../../services/global.service';

@Component({
  selector: 'app-correntista',
  templateUrl: './correntista.component.html',
  styleUrls: ['./correntista.component.css'],
})
export class CorrentistaComponent implements OnInit {
  correntistas: any;
  cpf: any;
  nome: any;
  formCliente = this.formBuilder.group({
    cpf: [null, Validators.required],
    nome: [null, Validators.required],
  });

  constructor(
    private correntistaService: CorrentistaService,
    private formBuilder: FormBuilder,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.exibirCorrentistas();
  }

  exibirCorrentistas(): void {
    this.correntistaService.list().subscribe(
      (data) => {
        this.correntistas = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  save(): void {
    const correntista = {
      cpf: this.cpf,
      nome: this.nome,
    };
    console.log(correntista);
    this.correntistaService.create(correntista).subscribe(
      (response) => {
        console.log(response);
        this.exibirCorrentistas();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onSubmit(): void {
    if (this.formCliente.valid) {
      this.save();
      this.resetForm();
      this.globalService.showMessage('Correntista cadastrado com sucesso!');
    } else {
      this.globalService.showMessage('Todos os campos são obrigatórios.');
    }
  }
  verificarValidForm(): void {
    Object.keys(this.formCliente.controls).forEach((campo) => {
      //console.log(campo);
      const controls = this.formCliente.get(campo);
      controls?.markAsDirty();
    });
  }

  verificarValidTouched(campo: string) {
    return (
      !this.formCliente.get(campo)?.valid && this.formCliente.get(campo)?.dirty
    );
  }

  resetForm() {
    this.formCliente.reset();
  }
}
