import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRichtexteditorComponent } from './custom-richtexteditor.component';

describe('CustomRichtexteditorComponent', () => {
  let component: CustomRichtexteditorComponent;
  let fixture: ComponentFixture<CustomRichtexteditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomRichtexteditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomRichtexteditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
