import { Component, OnInit } from '@angular/core';
import { MovimentacaoService } from './../../services/movimentacao.service';
import { CorrentistaService } from './../../services/correntista.service';

@Component({
  selector: 'app-movimentacao-list',
  templateUrl: './movimentacao-list.component.html',
  styleUrls: ['./movimentacao-list.component.css'],
})
export class MovimentacaoListComponent implements OnInit {
  movimentacoes: any;
  correntistas: any;
  correntista: any = {};

  constructor(
    private movimentacaoService: MovimentacaoService,
    private correntistaService: CorrentistaService
  ) {}

  ngOnInit(): void {
    this.exibirCorrentista();
  }

  listMovimentacoes(): void {
    this.movimentacaoService.findByIdConta(this.correntista.id).subscribe(
      (data) => {
        this.movimentacoes = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
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
}
