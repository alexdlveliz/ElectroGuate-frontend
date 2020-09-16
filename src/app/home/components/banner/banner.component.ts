import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, AfterViewInit {

  mySwiper: Swiper;
  images: string[] = [
    'assets/img/banner-1.webp',
    'assets/img/banner-2.jpg',
    'assets/img/banner-3.webp'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination'
      },
      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false
      // }
    });
  }

}
