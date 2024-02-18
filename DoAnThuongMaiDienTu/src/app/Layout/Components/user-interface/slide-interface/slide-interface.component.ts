import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-slide-interface',
  templateUrl: './slide-interface.component.html',
  styleUrls: ['./slide-interface.component.scss']
})
export class SlideInterfaceComponent implements OnInit {
  images = [
    {name:'assets/img/banner/301993485_1782695175429671_5496805865580899953_n.jpg',},
    {name:'assets/img/banner/271495673_1604142653284925_1036844338235843408_n.jpg',},
    {name:'assets/img/banner/294372419_1750235718675617_4597454377284936060_n.jpg',}
  ]

  constructor() { }

  ngOnInit(): void {
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
}
