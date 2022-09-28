import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TimeTableFormService } from './time-table-form.service';
import { TimeTableService } from '../service/time-table.service';
import { ITimeTable } from '../time-table.model';

import { TimeTableUpdateComponent } from './time-table-update.component';

describe('TimeTable Management Update Component', () => {
  let comp: TimeTableUpdateComponent;
  let fixture: ComponentFixture<TimeTableUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let timeTableFormService: TimeTableFormService;
  let timeTableService: TimeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TimeTableUpdateComponent],
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
      .overrideTemplate(TimeTableUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TimeTableUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    timeTableFormService = TestBed.inject(TimeTableFormService);
    timeTableService = TestBed.inject(TimeTableService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const timeTable: ITimeTable = { id: 456 };

      activatedRoute.data = of({ timeTable });
      comp.ngOnInit();

      expect(comp.timeTable).toEqual(timeTable);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITimeTable>>();
      const timeTable = { id: 123 };
      jest.spyOn(timeTableFormService, 'getTimeTable').mockReturnValue(timeTable);
      jest.spyOn(timeTableService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ timeTable });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: timeTable }));
      saveSubject.complete();

      // THEN
      expect(timeTableFormService.getTimeTable).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(timeTableService.update).toHaveBeenCalledWith(expect.objectContaining(timeTable));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITimeTable>>();
      const timeTable = { id: 123 };
      jest.spyOn(timeTableFormService, 'getTimeTable').mockReturnValue({ id: null });
      jest.spyOn(timeTableService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ timeTable: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: timeTable }));
      saveSubject.complete();

      // THEN
      expect(timeTableFormService.getTimeTable).toHaveBeenCalled();
      expect(timeTableService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITimeTable>>();
      const timeTable = { id: 123 };
      jest.spyOn(timeTableService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ timeTable });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(timeTableService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
