import { Component, OnInit } from '@angular/core';
declare function init_pugings();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_pugings();
  }

}
