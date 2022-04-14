import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-pagina-inicial",
  templateUrl: "./pagina-inicial.page.html",
  styleUrls: ["./pagina-inicial.page.scss"],
})
export class PaginaInicialPage implements OnInit {
  logo = [
    {
      image: "assets/imgs/Logo_LookCut.jpeg",
      title: "LookCut",
    },
  ];

  constructor() {}

  ngOnInit() {}
}
