import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {

  @Input() public chartLabels:string[] = [];
  @Input() public chartData:number[] = [];
  @Input() public chartType:string = '';

  constructor() { }

  ngOnInit() {
  }

}
