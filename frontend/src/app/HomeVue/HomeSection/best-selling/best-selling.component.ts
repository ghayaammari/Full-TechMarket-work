import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Swiper from 'swiper';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-best-selling',
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.css']
})
export class BestSellingComponent implements OnInit {
  ngOnInit(){ }

  url : string ="../../../../assets/images/p1.png";
  url2 : string ="../../../../assets/images/p1.png";
  url3: string="../../../../assets/images/p1.png";
  url4: string="../../../../assets/images/p1.png";
 
  constructor(){}
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  policyOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left" ></i>', '<i class="fa fa-caret-right" ></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  changeImage1(event: any) {
    this.url = event.target.src;
  }

  changeImage2(event: any) {
    this.url = event.target.src;
  }
  
  changeImage3(event: any) {
    this.url = event.target.src;
  }
}
