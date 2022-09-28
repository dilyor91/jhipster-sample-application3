import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { WorkPlanService } from '../service/work-plan.service';

import { WorkPlanComponent } from './work-plan.component';

describe('WorkPlan Management Component', () => {
  let comp: WorkPlanComponent;
  let fixture: ComponentFixture<WorkPlanComponent>;
  let service: WorkPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'work-plan', component: WorkPlanComponent }]), HttpClientTestingModule],
      declarations: [WorkPlanComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(WorkPlanComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WorkPlanComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(WorkPlanService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.workPlans?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to workPlanService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getWorkPlanIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getWorkPlanIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
