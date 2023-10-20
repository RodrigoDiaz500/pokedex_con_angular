import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LetterCountComponent } from './letter-count.component';

describe('LetterCountComponent', () => {
  let component: LetterCountComponent;
  let fixture: ComponentFixture<LetterCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LetterCountComponent]
    });
    fixture = TestBed.createComponent(LetterCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
