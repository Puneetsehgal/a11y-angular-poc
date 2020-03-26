import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      document.querySelectorAll('.primary-nav__heading')[0].classList.remove('active');
    },200);
  }
}
