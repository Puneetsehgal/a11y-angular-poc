import { Injectable } from '@angular/core';

@Injectable()
export class ConstantVariablesService {
  constructor() { }
  readonly rootPath: string = './accessible-ecommerce-demo';
}
