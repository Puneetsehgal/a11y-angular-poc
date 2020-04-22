import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryItemsComponent } from './order-summary-items.component';

describe('OrderSummaryItemsComponent', () => {
  let component: OrderSummaryItemsComponent;
  let fixture: ComponentFixture<OrderSummaryItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSummaryItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
