import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { WorkPlanFormService } from './work-plan-form.service';
import { WorkPlanService } from '../service/work-plan.service';
import { IWorkPlan } from '../work-plan.model';

import { WorkPlanUpdateComponent } from './work-plan-update.component';

describe('WorkPlan Management Update Component', () => {
  let comp: WorkPlanUpdateComponent;
  let fixture: ComponentFixture<WorkPlanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let workPlanFormService: WorkPlanFormService;
  let workPlanService: WorkPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [WorkPlanUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(WorkPlanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WorkPlanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    workPlanFormService = TestBed.inject(WorkPlanFormService);
    workPlanService = TestBed.inject(WorkPlanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const workPlan: IWorkPlan = { id: 456 };

      activatedRoute.data = of({ workPlan });
      comp.ngOnInit();

      expect(comp.workPlan).toEqual(workPlan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkPlan>>();
      const workPlan = { id: 123 };
      jest.spyOn(workPlanFormService, 'getWorkPlan').mockReturnValue(workPlan);
      jest.spyOn(workPlanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workPlan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workPlan }));
      saveSubject.complete();

      // THEN
      expect(workPlanFormService.getWorkPlan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(workPlanService.update).toHaveBeenCalledWith(expect.objectContaining(workPlan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkPlan>>();
      const workPlan = { id: 123 };
      jest.spyOn(workPlanFormService, 'getWorkPlan').mockReturnValue({ id: null });
      jest.spyOn(workPlanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workPlan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workPlan }));
      saveSubject.complete();

      // THEN
      expect(workPlanFormService.getWorkPlan).toHaveBeenCalled();
      expect(workPlanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkPlan>>();
      const workPlan = { id: 123 };
      jest.spyOn(workPlanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workPlan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(workPlanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
