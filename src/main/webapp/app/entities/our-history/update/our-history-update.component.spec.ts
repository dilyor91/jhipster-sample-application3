import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OurHistoryFormService } from './our-history-form.service';
import { OurHistoryService } from '../service/our-history.service';
import { IOurHistory } from '../our-history.model';

import { OurHistoryUpdateComponent } from './our-history-update.component';

describe('OurHistory Management Update Component', () => {
  let comp: OurHistoryUpdateComponent;
  let fixture: ComponentFixture<OurHistoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ourHistoryFormService: OurHistoryFormService;
  let ourHistoryService: OurHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [OurHistoryUpdateComponent],
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
      .overrideTemplate(OurHistoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OurHistoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ourHistoryFormService = TestBed.inject(OurHistoryFormService);
    ourHistoryService = TestBed.inject(OurHistoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const ourHistory: IOurHistory = { id: 456 };

      activatedRoute.data = of({ ourHistory });
      comp.ngOnInit();

      expect(comp.ourHistory).toEqual(ourHistory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOurHistory>>();
      const ourHistory = { id: 123 };
      jest.spyOn(ourHistoryFormService, 'getOurHistory').mockReturnValue(ourHistory);
      jest.spyOn(ourHistoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ourHistory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ourHistory }));
      saveSubject.complete();

      // THEN
      expect(ourHistoryFormService.getOurHistory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ourHistoryService.update).toHaveBeenCalledWith(expect.objectContaining(ourHistory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOurHistory>>();
      const ourHistory = { id: 123 };
      jest.spyOn(ourHistoryFormService, 'getOurHistory').mockReturnValue({ id: null });
      jest.spyOn(ourHistoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ourHistory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ourHistory }));
      saveSubject.complete();

      // THEN
      expect(ourHistoryFormService.getOurHistory).toHaveBeenCalled();
      expect(ourHistoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOurHistory>>();
      const ourHistory = { id: 123 };
      jest.spyOn(ourHistoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ourHistory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ourHistoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
