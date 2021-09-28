import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides = [ {'image': 'https://c.pxhere.com/photos/77/20/flowers_sky_blue_nature_blossom_bloom_spring_summer-687782.jpg!d'},
             {'image': 'https://c.pxhere.com/photos/81/f7/plant_nature_live-622894.jpg!d'},
             {'image': 'https://c.pxhere.com/photos/68/a1/bee_flower_macro_summer_nature_insect_pollination_pollen-536458.jpg!d'},
             {'image': 'https://c.pxhere.com/photos/cc/59/flowers_photographed_from_below_gegenlichtaufnahme_back_light_sunbeam_sun_lighting_spring-686247.jpg!d'},
             {'image': 'https://c.pxhere.com/photos/6a/5c/flower_cherry_spring_spring_flowers_bloom_cherry_blossom-1412238.jpg!d'}];


  constructor() { }

  ngOnInit(): void { }

}
