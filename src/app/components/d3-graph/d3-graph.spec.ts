import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3Graph } from './d3-graph';

describe('D3Graph', () => {
  let component: D3Graph;
  let fixture: ComponentFixture<D3Graph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D3Graph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3Graph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
