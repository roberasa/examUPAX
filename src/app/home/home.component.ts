import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides = [ {'image': 'https://c.pxhere.com/photos/ca/7b/insect_macro_bug_nature_animal_detailed_colors-1292486.jpg!d'},
             {'image': 'https://c.pxhere.com/photos/29/c7/flower_purple_lical_blosso_beautiful_beauty_bloom_blooming-1328279.jpg!d'},
             {'image': 'https://c.pxhere.com/photos/33/56/kingfisher_bird_wildlife_macro_closeup_portrait_colorful_colors-1189071.jpg!d'},
             {'image': 'https://c.pxhere.com/photos/a4/b4/marguerite_daisy_beautiful_beauty_bloom_blooming_blossom_blue_background-1328280.jpg!d'},
             {'image': 'https://c.pxhere.com/photos/e4/f3/flower_beautiful_beauty_bloom_blooming_blossom_botanical_botany-1231118.jpg!d'}];


  constructor() { }

  ngOnInit(): void { }

}
