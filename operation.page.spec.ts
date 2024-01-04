import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { OperationPage } from './operation.page';

describe('OperationPage', () => {
  let component: OperationPage;
  let fixture: ComponentFixture<OperationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OperationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
