import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WorkPlanDetailComponent } from './work-plan-detail.component';

describe('WorkPlan Management Detail Component', () => {
  let comp: WorkPlanDetailComponent;
  let fixture: ComponentFixture<WorkPlanDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkPlanDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ workPlan: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(WorkPlanDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(WorkPlanDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load workPlan on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.workPlan).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
