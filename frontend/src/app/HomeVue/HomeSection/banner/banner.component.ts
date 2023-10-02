import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  images = [
    "../assets/images/e-commerce1.avif",
    "../assets/images/e-commerce2.avif",
    "../assets/images/e-commerce3.avif"
  ];
}
