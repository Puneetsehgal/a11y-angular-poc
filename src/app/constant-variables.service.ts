import { Injectable } from '@angular/core';

@Injectable()
export class ConstantVariablesService {
  constructor() { }
  readonly rootPath: string = (window.location.pathname === '/index.html'
    || window.location.pathname === '/accessible-ecommerce-demo/'
    || window.location.pathname === '/accessible-ecommerce-demo/index.html'
  ) ? '.' : '..';
}
