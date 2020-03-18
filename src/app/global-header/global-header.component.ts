import { Component, OnInit } from '@angular/core';
import { ConstantVariablesService } from '../constant-variables.service'

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss']
})
export class GlobalHeaderComponent implements OnInit {
  rootPath: string;
  primaryMenu: Array<string> = ["Women", "Men", "Girls", "Boys"];
  subMenu: Array<string> = ["Tops", "Pants", "Kilts", "Shoes", "Hats"];
  navigationMenu: Object = {};
  openSubMenu: boolean = false;
  navId: string;

  constructor(private _constant: ConstantVariablesService) {
    this.rootPath = this._constant.rootPath;
  }

  ngOnInit(): void {
    this.navigationMenu = this.primaryMenu.map(item => {
      let obj = {};
      let subMenu = [];
      if (item === "Women") {
        subMenu.push("Womens");
      } else if (item == "Men") {
        subMenu.push("Mens");
      } else {
        subMenu.push(item);
      }
      subMenu.push(...this.subMenu);

      obj["primaryMenu"] = item;
      obj["subMenu"] = subMenu;
      return obj;
    });
  }

  onClickOpenSubMenu(id) {
    this.navId = id;
    this.openSubMenu = !this.openSubMenu;
  };

  onBlurCloseSubMenu(event) {
    const self = this;
    const blurFromOpenMenu = event.currentTarget.matches('.has-submenu.open *');
    setTimeout(function () {
      const activeFocusElement = document.activeElement;
      self.openSubMenu = blurFromOpenMenu && activeFocusElement.matches('.has-submenu.open *');
    }, 1);
  };
}