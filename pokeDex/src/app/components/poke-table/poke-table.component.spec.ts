import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeTableComponent } from './poke-table.component';

describe('PokeTableComponent', () => {
  let component: PokeTableComponent;
  let fixture: ComponentFixture<PokeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokeTableComponent]
    });
    fixture = TestBed.createComponent(PokeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
