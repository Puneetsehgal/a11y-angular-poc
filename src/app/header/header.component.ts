import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterState } from '@angular/router'
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  globalHeader: boolean;
  checkoutHeader: boolean;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Load checkout header for checkout page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((route:any) => {
      if (route.url.indexOf("/checkout") > -1) {
        this.globalHeader = false;
        this.checkoutHeader = true;
      } else {
        this.globalHeader = true;
        this.checkoutHeader = false;
      }
    });
  }
}
