import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  logo = [
    {
      image: 'assets/imgs/Logo_LookCut.jpeg',
      title: 'LookCut'
    },
  ];

  constructor() {}

  ngOnInit() {}
}
