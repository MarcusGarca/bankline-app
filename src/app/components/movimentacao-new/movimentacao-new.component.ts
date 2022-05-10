import { Component, OnInit } from '@angular/core';
import { CorrentistaService } from './../../services/correntista.service';
import { MovimentacaoService } from './../../services/movimentacao.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { GlobalService } from './../../services/global.service';

@Component({
  selector: 'app-movimentacao-new',
  templateUrl: './movimentacao-new.component.html',
  styleUrls: ['./movimentacao-new.component.css'],
})
export class MovimentacaoNewComponent implements OnInit {
  correntistas: any;
  correntista: any;
  valor: any;
  descricao: any;
  tipo: any;
  dataHora: any;

  formMovimento = this.formBuilder.group({
    dataHora: [null, Validators.required],
    correntista: [null, Validators.required],
    descricao: [null, Validators.required],
    tipo: [null, Validators.required],
    valor: [null, Validators.required],
  });

  constructor(
    private movimentacaoService: MovimentacaoService,
    private correntistaService: CorrentistaService,
    private formBuilder: FormBuilder,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.exibirCorrentista();
  }

  exibirCorrentista(): void {
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

  onSubmit(): void {
    if (this.formMovimento.valid) {
      this.save();
      this.resetForm();
      this.globalService.showMessage('Transação realizada com sucesso!');
    } else {
      this.globalService.showMessage('Todos os campos são obrigatórios.');
    }
  }

  save(): void {
    console.log(this.correntista);

    const movimentacao = {
      valor: this.valor,
      descricao: this.descricao,
      tipo: this.tipo,
      idConta: this.correntista.id,
      dataHora: this.dataHora,
    };
    console.log(movimentacao);
    this.movimentacaoService.create(movimentacao).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  verificarValidForm(): void {
    Object.keys(this.formMovimento.controls).forEach((campo) => {
      //console.log(campo);
      const controls = this.formMovimento.get(campo);
      controls?.markAsDirty();
    });
  }

  verificarValidTouched(campo: string) {
    return (
      !this.formMovimento.get(campo)?.valid &&
      this.formMovimento.get(campo)?.dirty
    );
  }

  resetForm() {
    this.formMovimento.reset();
  }
}
